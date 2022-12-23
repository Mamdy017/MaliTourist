// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaysModele } from '../modeles/pays-modele';
@Injectable({
  providedIn: 'root'
})

export class PaysServiceService {
  
  totPop() :Observable<any> {
   return this.http.get("http://localhost:8080/pays/totalPop");
  }
  getAllSuperficie() :Observable<any> {
    return this.http.get("http://localhost:8080/pays/allsuperficie");
  }

  file:any;
  file1:any;
  constructor( private http: HttpClient) { }
  ajouterPAys(nom: string, capital:string, superficie:string, file:any):Observable<any>{
    let Data =new FormData();
    Data.append('file',file);
    Data.append('nom',nom);
    Data.append('capital',capital);
    Data.append('superficie',superficie);
    return this.http.post<any>('http://localhost:8080/pays/ajout',Data);
  }


  // ajouterPAys(paysModele:PaysModele):Observable<any>{
  //   console.log('http://localhost:8080/pays/ajout',paysModele);
  //   return this.http.post<any>('http://localhost:8080/pays/ajout',paysModele);
  // }

  afficherPays() :Observable<any>{
    return this.http.get("http://localhost:8080/pays/liste");
  }
  afficherPaysParId(id_pays : number) :Observable<any>{
    return this.http.get(`http://localhost:8080/pays/${id_pays}`);
  }
}
