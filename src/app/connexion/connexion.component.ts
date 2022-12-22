import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../service/connexion.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  connexionReussi = false;
  connexionEchoue = false;
  messageErreur = '';
  roles: string[] = [];

  constructor(private connexion:ConnexionService,
     private storage:StorageService,
     private router:Router
     
     ) { }
  ngOnInit(): void {
    if (this.storage.connexionReussi()) {
      this.connexionReussi = true;
      this.roles = this.storage.recupererUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.connexion.login(username, password).subscribe({
      next: data => {
        this.storage.enregistrer(data);

        this.connexionEchoue = false;
        this.connexionReussi = true;
        this.roles = this.storage.recupererUser().roles;
        //this.reloadPage();
        this.router.navigateByUrl("/sidebar/board")
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.connexionEchoue = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
