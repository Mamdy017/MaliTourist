import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionModele } from '../modeles/region-modele';

@Injectable({
  providedIn: 'root'
})
export class RegionServiceService {

  file1:any;
  file3:any;
  file2:any;
  constructor( private http: HttpClient) { }
  ajouterRegion(region:RegionModele):Observable<any>{

    return this.http.post<any>(`http://localhost:8080/region/ajout/`, region);
  }
  uploaderImage(image : File) :Observable<void>{
   let data = new FormData();
    data.append('file',image);
    const headers = new Headers();
    headers.append('Content-type', 'multipart/form-data');
    
    return this.http.post<void>(`http://localhost:8080/region/upload/`, data);
  }

}
