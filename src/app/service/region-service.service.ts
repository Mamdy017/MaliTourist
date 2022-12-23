import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitants } from '../modeles/habitants';
import { RegionModele } from '../modeles/region-modele';
const AUTH_API = 'http://localhost:8080/api/auth/';
@Injectable({
  providedIn: 'root'
})
export class RegionServiceService {
  constructor( private http: HttpClient) { }

  ajouterRegion(nom: string, code_region:string, activite:string,superficie:string, description:string,img1:any,img2:any,img3:any,idPays:any ):Observable<any>{
    let Data =new FormData();
    Data.append('img1',img1);
    Data.append('img2',img2);
    Data.append('img3',img3);
    Data.append('nom',nom);
    Data.append('code_region',code_region);
    Data.append('activite',activite);
    Data.append('superficie',superficie);
    Data.append('description',description);
    // Data.append('id',idPays);
    return this.http.post(`http://localhost:8080/region/ajout/${idPays}`,Data);
  }

  afficherRegion() :Observable<any>{
    return this.http.get("http://localhost:8080/region/afficher");
  }
  afficherRecent(paysId:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/region/afficherParId/${paysId}`);
  }

  detailsRegion(regionId:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/region/${regionId}`);
  }

  ajouterHabitant(chiffre:string,langue:string, annee:string,idRegion:any):Observable<any>{
    let data = new FormData();
    data.append('chiffre',chiffre),
    data.append('langue',langue),
    data.append('annee',annee)
    // data.append('idRegion',idRegion)
    return this.http.post(`http://localhost:8080/population/creer/${idRegion}`,data);
  }


  commentaire(commentaire:string,idregion:any,iduser:any):Observable<any>{
    let data = new FormData();
    data.append('commentaire',commentaire)
    // data.append('idRegion',idRegion)
    return this.http.post(`http://localhost:8080/commentaire/creer/${idregion}/${iduser}`,data);
  }
  afficherCommentaire(idRegion:number, iduser:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/commentaire/afficherParId/${idRegion}/${iduser}`);
  }

  afficherHabitant(idRegion:number) :Observable<any>{
    return this.http.get(`http://localhost:8080/region/afficherParId/${idRegion}`);
  }
}
