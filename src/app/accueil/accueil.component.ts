import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RegionModele } from '../modeles/region-modele';
import { PaysServiceService } from '../service/pays-service.service';
import { RegionServiceService } from '../service/region-service.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

})
export class AccueilComponent implements OnInit {

  recent: any
  RegionObjet: RegionModele = {
    id: 0,
    nom: '',
    code_region: '',
    activite: '',
    superficie: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    idPays: ''
    // image2:'',
  }
  formodule!: FormGroup;
  message: string | undefined;
  contenu: any;
  img1: any;
  img2: any;
  img3: any;
  nom!: string;
  code_region!: string;
  activite!: string;
  superficie!: string;
  description!: string;
  idPays: any;
  pays1: any;


  constructor(private service: RegionServiceService, private routes: ActivatedRoute, private formB: FormBuilder, private paysService: PaysServiceService) { }

  ngOnInit(): void {
    this.formodule = this.formB.group({
      nom: ["", Validators.required],
      code_region: ["", Validators.required],
      activite: ["", Validators.required],
      superficie: ["", Validators.required],
      description: ["", Validators.required],
      img1: ["", Validators.required],
      img2: ["", Validators.required],
      img3: ["", Validators.required],

    })
    this.idPays = this.routes.snapshot.params['idPays']

    //methode permettant de ...
    this.service.afficherRecent(this.idPays).subscribe(data=>{
      this.recent = data
      console.log("mon pays", this.recent);
      
    })
    this.paysService.afficherPaysParId(this.idPays).subscribe(data=>{
      this.pays1= data;
      // console.table("dd"+ this.pays1);
      console.log(this.pays1)
      
    })
    

  }
  fileChang1(event: any) {
    this.img1 = event.target.files[0]
    console.log(event)
  }
  fileChang2(event: any) {
    this.img2 = event.target.files[0]
    console.log(event)

  }
  fileChang3(event: any) {
    this.img3 = event.target.files[0]
    console.log(event)

  }
  AjoutRegion() {


    if (this.nom == "" || this.code_region == '' || this.activite == '' || this.superficie == '' || this.description == '' || this.img1 == null || this.img2 == null || this.img3 == null) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Tous les champs sont obligatoire!',
      })
    } else {
      Swal.fire({
        title: 'Etes vous sur de vouloir ajoutée cette région ?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#198754',
        cancelButtonColor: '#E74447',
        confirmButtonText: 'Oui'
      }).then((result) => {
        console.log(this.nom);
        this.service.ajouterRegion(this.nom, this.code_region, this.activite, this.superficie, this.description, this.img1, this.img2, this.img3, this.idPays).subscribe(data => {
          console.table(data);
        })
        if (result.isConfirmed) {
          Swal.fire(
            'Ajoutée!',
            'Votre région a été ajoutée avec succès.',
            'success'
          )
        }
      })
      


    }


  }
}