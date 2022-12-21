import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionModele } from '../modeles/region-modele';

@Injectable({
  providedIn: 'root'
})
export class RegionServiceService {

  img1:any;
  img2:any;
  img3:any;
  constructor( private http: HttpClient) { }
  // ajouterRegion(region:RegionModele):Observable<any>{

  //   return this.http.post<any>(`http://localhost:8080/region/ajout/`, region);
  // }
  ajouterRegion(nom: string, code_region:string,activite:string, superficie:string, description:string,idPays:any, img1:any,img2:any,img3:any):Observable<any>{
    let data = new FormData();
    data.append('nom',nom);
    data.append('code_region',code_region);
    data.append('activite',activite);
    data.append('description',description);
    data.append('idPays',idPays);
    data.append('superficie',superficie);
    data.append('img1',img1);
    data.append('img2',img2);
    data.append('img3',img3);
    const headers = new Headers();
    return this.http.post<any>(`http://localhost:8080/region/ajout/`,data);
  }
  // uploaderImage(image : File) :Observable<void>{
  //  let data = new FormData();
  //   data.append('file',image);
  //   const headers = new Headers();
  //   headers.append('Content-type', 'multipart/form-data');

  //   return this.http.post<void>(`http://localhost:8080/region/upload/`, data);
  // }



}
