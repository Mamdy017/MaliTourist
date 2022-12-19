import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionServiceService {

  file1:any;
  file3:any;
  file2:any;
  constructor( private http: HttpClient) { }
  ajouterRegion(nom: string, code_region:string, activite:string,superficie:string,description:string, idPays:number, file1:any, file2:any, file3:any):Observable<any>{
    let Data =new FormData();
    Data.append('nom',nom);
    Data.append('code_region',code_region);
    Data.append('activite',activite);
    Data.append('description',description);
    Data.append('superficie',superficie);
    Data.append('file1',file1);
    Data.append('file2',file2);
    Data.append('file3',file3);
    // Data.append('idPays',idPays)
    return this.http.post<any>('http://localhost:8080/region/ajout',Data);
  }

}
