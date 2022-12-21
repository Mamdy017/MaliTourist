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

  pays:any;

  Regionobjet: RegionModele = {
    idRegion: 0,
    nom: '',
    description: '',
    activite: '',
    code_region: '',
    superficie: '',
    pays: new PaysModele,
    image1 : '',
    image2 : '' ,
    image3:'',
  }

  formmodule!: FormGroup;
    nom!: string;
    description!: string;
    activite!: string;
    code_region!: string;
    superficie!: string;
    img1 :any;
    img2:any;
    img3:any;

   idPays : any;

  //  img1:any
  //  img2:any
  //  img3:any
  message: string | undefined;
  constructor( private service:RegionServiceService, private routes: ActivatedRoute, private formB: FormBuilder, private paysService : PaysServiceService) { }

  ngOnInit(): void {
    this.idPays = this.routes.snapshot.params['idPays']
    console.table("je suis la"+ this.idPays)
    this.paysService.afficherPaysParId(this.idPays).subscribe(resultat => {
      console.table(resultat)
      this.pays = resultat;
    })

    this.formmodule = this.formB.group({
      nom: ["", Validators.required],
      code_region: ["", Validators.required],
      superficie: ["", Validators.required],
      description: ["", Validators.required],
      activite: ["", Validators.required],
      img1: ["", Validators.required],
      img2: ["", Validators.required],
      img3: ["", Validators.required],


    })
    // this.service.afficherPays().subscribe(data => {
    //   this.pays = data;
    //   console.table(this.pays);
    // });
  }

  fileChang1(event: any) {
    this.img1 = event.target.files[0]
    // this.nomFile1 = event.target.files[0]['name']
  }
  fileChang2(event: any) {
    this.img2 = event.target.files[0]
    // this.nomFile2 = event.target.files[0]['name']
  }
  fileChang3(event: any) {
    this.img3 = event.target.files[0]
    console.log(event)
  }


  AjoutRegion() {
    this.idPays = this.routes.snapshot.params['idPays']
    console.table('je suis'+this.idPays)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-primary',


      },
      heightAuto: false
    })

    if (this.nom == "" || this.code_region == '' || this.superficie == '' || this.activite == '' || this.description == ''  ||  this.img1 == null || this.img2 == null || this.img3 == null) {
      swalWithBootstrapButtons.fire(
        this.message = " Veuillez bien remplir tous les champs !",
      )
      // this.resetForm();
    } else {
      swalWithBootstrapButtons.fire({
        title: 'Cet pays va etre ajooutée !!!!',
        text: "Vous pouvez annuler ou confirmer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confimer!',
        cancelButtonText: 'Annuler!',


      }).then((result) => {
        if (result.isConfirmed) {
          this.service.ajouterRegion(this.Regionobjet.nom, this.Regionobjet.code_region, this.Regionobjet.superficie,this.Regionobjet.activite,this.Regionobjet.description, this.idPays, this.img1,this.img2,this.img3).subscribe(data => {
            if (data.status == true) {
              // this.route.navigateByUrl("/gestionentite")
              swalWithBootstrapButtons.fire(
                'Pays ajouté avec succes!',
                'Vous êtes diriger vers la liste des entités.',
                'success',)
                console.log("je suis la ==="+ this.Regionobjet);

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


    this.Regionobjet = this.formmodule.value
    let data = new FormData();

  }




}
