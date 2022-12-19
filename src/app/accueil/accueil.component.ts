import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PaysModele } from '../modeles/pays-modele';
import { RegionModele } from '../modeles/region-modele';
import { PaysServiceService } from '../service/pays-service.service';
import { RegionServiceService } from '../service/region-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

})
export class AccueilComponent implements OnInit {
  file: any;


  nom: string | undefined;
  code_region: string | undefined;
  superficie: string | undefined;
  activite!: string;
  description!: string;
  file2!: File;
  nomFile2!: string;
  file3!: File;
  nomFile3!: string;
  message!: string;
  file1!: File;
  nomFile1! : string;
  formmodule!: FormGroup;
   idPays : any;
  pays! : PaysModele;

  constructor( private service:RegionServiceService, private routes: ActivatedRoute, private formB: FormBuilder, private paysService : PaysServiceService) { }

  ngOnInit(): void {
    this.idPays = this.routes.snapshot.params['idPays']
    this.paysService.afficherPaysParId(this.idPays).subscribe(resultat => {
      console.table(resultat)
      this.pays = resultat;
    })

    this.formmodule = this.formB.group({
      nom: ["", Validators.required],
      file1: ["", Validators.required],
      code_region: ["", Validators.required],
      superficie: ["", Validators.required],
      description: ["", Validators.required],
      activite: ["", Validators.required],
      file2: ["", Validators.required],
      file3: ["", Validators.required],


    })
    // this.service.afficherPays().subscribe(data => {
    //   this.pays = data;
    //   console.table(this.pays);
    // });
  }

  fileChang1(event: any) {
    this.file1 = event.target.files[0]
    this.nomFile1 = event.target.files[0]['name']
  }
  fileChang2(event: any) {
    this.file2 = event.target.files[0]
    this.nomFile2 = event.target.files[0]['name']
  }
  fileChang3(event: any) {
    this.file3 = event.target.files[0]
    this.nomFile3 = event.target.files[0]['name']
  }


  AjoutRegion() {
    var pays = new PaysModele({
      "id": this.idPays
    })
    let region = new RegionModele(
      {
         "nom": this.nom,
         "code_region": this.code_region,
         "superficie": this.superficie,
         "description": this.description,
         "activite":this.activite,
         "img1": this.nomFile1,
         "img2":this.nomFile2,
         "img3" :this.nomFile3,
         "pays": pays,
       }
    )
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-primary',


      },
      heightAuto: false
    })

    

    if (this.nom == "" || this.code_region == '' || this.superficie == '' || this.activite == '' || this.description == ''  ||  this.file1 == null || this.file2 == null || this.file3 == null) {
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
          this.service.ajouterRegion(region).subscribe(data => {
            console.table(data)
            if (data.status == true) {
              // this.route.navigateByUrl("/gestionentite")
              swalWithBootstrapButtons.fire(
                'Entité ajoutée avec succes!',
                'Vous êtes diriger vers la liste des entités.',
                'success',)
                console.log("je suis la ============================ "+ region);

            if(this.file1 != null && this.file2 != null && this.file3 != null){
             console.table('je suis la');
             this.service.uploaderImage(this.file1).subscribe(data => {
              console.log("----------------b")
             })
             this.service.uploaderImage(this.file2).subscribe(data => {
              console.log("----------------b")
             })
             this.service.uploaderImage(this.file3).subscribe(data => {
              console.log("----------------b")
             })
              }
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


    // this.RegionObject = this.formmodule.value
    let data = new FormData();

  }


}
