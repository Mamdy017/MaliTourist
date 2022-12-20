import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../service/connexion.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  form : any={
    email:null,
    password:null
  }
  connexionReussi= false;
  connexionEchoue=false;
  messageErreur= '';
  roles:string[]=[];

  constructor(private connexion:ConnexionService, private storage:StorageService ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.connexion.connexioon(email, password).subscribe({
      next: data => {
        this.storage.enregistrer(data);

        this.connexionEchoue = false;
        this.connexionReussi = true;
        this.roles = this.storage.recupererUser().roles;
        this.reloadPage();
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
