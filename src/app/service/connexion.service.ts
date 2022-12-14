// import { HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// const AUTH_API = 'http://localhost:8080/api/auth/';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


// @Injectable({
//   providedIn: 'root'
// })
// export class ConnexionService {
//   http: any;
//  constructor() { }
//   connexioon(username: string, password: string): Observable<any> {
//     return this.http.post(
//       AUTH_API + 'signin',
//       {
//         username,
//         password,
//       },
//       httpOptions
//     );
//   }

//   inscription(nom: string, prenom:string, email: string, password: string): Observable<any> {
//     return this.http.post(
//       AUTH_API + 'signup',
//       {
//         nom,
//         prenom,
//         email,
//         password,
//       },
//       httpOptions
//     );
//   }

//   deconnexion(): Observable<any> {
//     return this.http.post(AUTH_API + 'deconnexion', { }, httpOptions);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const req = new HttpRequest('POST', AUTH_API + 'signout', {}, httpOptions);
    return this.http.request(req);
  }
}
