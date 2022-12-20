import { Injectable } from '@angular/core';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public enregistrer(utilisateur: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(utilisateur));
  }

  public recupererUser(): any {
    const utilisateur = window.sessionStorage.getItem(USER_KEY);
    if (utilisateur) {
      return JSON.parse(utilisateur);
    }

    return {};
  }

  public connexionReussi(): boolean {
    const utilisateur = window.sessionStorage.getItem(USER_KEY);
    if (utilisateur) {
      return true;
    }

    return false;
  }
}
