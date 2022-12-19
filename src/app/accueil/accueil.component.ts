import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PaysModele } from '../modeles/pays-modele';
import { RegionModele } from '../modeles/region-modele';
import { RegionServiceService } from '../service/region-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

})
export class AccueilComponent implements OnInit {
  file: any;

  RegionObject: RegionModele = {
    idRegion: 0,
    nom: '',
    code_region: '',
    superficie: '',
    description: '',
    activite:'',
    img1:'',
    img2:'',
    img3:'',
    // idPays : new PaysModele,
  }
  nom: string | undefined;
  code_region: string | undefined;
  superficie: string | undefined;
  activite!: string;
  description!: string;
  file2!: any;
  file3!: AnimationStyleMetadata;
  message!: string;
  file1: any;
  formmodule!: FormGroup;
  // idPays :any;

  constructor( private service:RegionServiceService, private routes: ActivatedRoute, private formB: FormBuilder,) { }

  ngOnInit(): void {
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

  fileChang2(event: any) {
    this.file2 = event.target.files[0]
    console.log(event)
  }
  fileChang1(event: any) {
    this.file1 = event.target.files[0]
    console.log(event)
  }
  fileChang3(event: any) {
    this.file3 = event.target.files[0]
    console.log(event)
  }


  AjoutRegion() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-primary',


      },
      heightAuto: false
    })

    const idPays = this.routes.snapshot.params['idPays']

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
          this.service.ajouterRegion(this.RegionObject.nom, this.RegionObject.code_region, this.RegionObject.superficie,  this.RegionObject.activite, this.RegionObject.description,idPays,this.file1, this.file2, this.file3).subscribe(data => {
            if (data.status == true) {
              // this.route.navigateByUrl("/gestionentite")
              swalWithBootstrapButtons.fire(
                'Entité ajoutée avec succes!',
                'Vous êtes diriger vers la liste des entités.',
                'success',)
                console.log("je suis la ======================================================================== ================================================================================================================================================================================================================================================================================================================================================================================================================================"+ this.RegionObject);

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


    this.RegionObject = this.formmodule.value
    let data = new FormData();

  }


}
