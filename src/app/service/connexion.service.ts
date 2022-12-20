import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  http: any;
 constructor() { }
  connexioon(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  inscription(nom: string, prenom:string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        nom,
        prenom,
        email,
        password,
      },
      httpOptions
    );
  }

  deconnexion(): Observable<any> {
    return this.http.post(AUTH_API + 'deconnexion', { }, httpOptions);
  }
}
