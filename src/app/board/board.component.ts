import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fichier, PaysModele } from '../modeles/pays-modele';
// import { Fichier, PaysModele } from '../modeles/pays-modele';
import { PaysServiceService } from '../service/pays-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  pays:any;
  p = 1;

  Paysobjet: PaysModele = {
    id: 0,
    nom: '',
    capital: '',
    superficie: '',
    drapeau: '',
    image2:'',
  }

  formmodule!: FormGroup;
  // fichier!: File;
  // fichier!: Fichier;
  message: string | undefined;
  contenu: any;
  nom !: string;
  capital !: string;
  superficie !: string;
  file: any;
  // file2: any;

  constructor(private service: PaysServiceService, private formB: FormBuilder,) { }

  ngOnInit(): void {
    this.formmodule = this.formB.group({
      nom: ["", Validators.required],
      file: ["", Validators.required],
      capital: ["", Validators.required],
      superficie: ["", Validators.required],
      // file2: ["", Validators.required],
      // iduser:["",Validators.required]
    })
    this.service.afficherPays().subscribe(data => {
      this.pays = data;
      console.table(this.pays);
    });
  }


  fileChang(event: any) {
    this.file = event.target.files[2]
    console.log(event)

  }

  // fileChang1(event1: any) {
  //   this.file2 = event1.target.files[0]
  //   console.log(event1)

  // }



  AjoutPays() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-primary',


      },
      heightAuto: false
    })

    if (this.nom == "" || this.capital == '' || this.superficie == '' || this.file == null) {
      swalWithBootstrapButtons.fire(
        this.message = " Veuillez bien remplir tous les champs !",
      )
      // this.resetForm();
    } else {
      swalWithBootstrapButtons.fire({
        title: 'Cette entité va etre ajooutée !!!!',
        text: "Vous pouvez annuler ou confirmer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confimer!',
        cancelButtonText: 'Annuler!',


      }).then((result) => {
        if (result.isConfirmed) {
          this.service.ajouterPAys(this.Paysobjet.nom, this.Paysobjet.capital, this.Paysobjet.superficie, this.file).subscribe(data => {
            if (data.status == true) {
              // this.route.navigateByUrl("/gestionentite")
              swalWithBootstrapButtons.fire(
                'Entité ajoutée avec succes!',
                'Vous êtes diriger vers la liste des entités.',
                'success',)
                console.log("je suis la ======================================================================== ================================================================================================================================================================================================================================================================================================================================================================================================================================"+ this.Paysobjet);

            } else {
              swalWithBootstrapButtons.fire(
                this.message = data.contenu,

              )
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Ajout de l'entité annulée"
          )

        }
      })

    }


    this.Paysobjet = this.formmodule.value
    let data = new FormData();

  }





}
