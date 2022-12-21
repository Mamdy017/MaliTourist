import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../service/connexion.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  InscriptionReussi = false;
  Inscriptionechoue = false;
  messageErreur = '';

  constructor( private inscription:ConnexionService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.inscription.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.InscriptionReussi = true;
        this.Inscriptionechoue = false;
      },
      error: err => {
        this.messageErreur = err.error.message;
        this.Inscriptionechoue = true;
      }
    });
  }
}
