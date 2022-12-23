import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { elementAt } from 'rxjs';
import { Commentaire } from '../modeles/commentaire';
import { Habitants } from '../modeles/habitants';
import { RegionServiceService } from '../service/region-service.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  formmodule!: FormGroup;
  habibant: Habitants = {
    id: 0,
    chiffre: '',
    annee: '',
    langue: '',
  }
  details: any;
  idRegion: any;
  chiffre!: string;
  langue!: string;
  annee!: string;
  adama: any;
  ann: any;
  lan: any;
  moi:any;

  commentaire!:string;
  commentaireOgjet : Commentaire={
    id:0,
    commentaire:'',
  }
  currentUser: any;
  afficC: any;

  constructor(private service: RegionServiceService, private formB: FormBuilder, private routes: ActivatedRoute, private storage:StorageService) { }

  ngOnInit(): void {
    this.idRegion = this.routes.snapshot.params['idRegion']
    this.service.detailsRegion(this.idRegion).subscribe(data => {
      this.details = data;
      console.table(this.details);
    });

    this.formmodule = this.formB.group({
      chiffre: ["", Validators.required],
      langue: ["", Validators.required],
      annee: ["", Validators.required],
    })

    this.currentUser=this.storage.recupererUser();
    console.table(this.currentUser);
    this.moi = this.currentUser.id;

    console.log("je suis id user" + this.moi);

    this.service.afficherCommentaire(this.idRegion,this.moi).subscribe(data=>{
      this.afficC = data
      console.table("mon pays", this.afficC);

    })

  }

  habitantsAjouter() {

    if (this.chiffre=='' || this.langue == '' || this.annee == '') {
      alert('Vide')
    } else {
      alert('Rensei')

      // this.habibant.annee = this.annee;
      // this.habibant.chiffre = this.chiffre;
      // this.habibant.langue = this.langue
      // console.log("mes données: ", this.annee);
      // console.log("mes données: ", this.chiffre);
      // console.log("mes données: ", this.langue);
      // console.log("mes données: ", this.idRegion);
      this.service.ajouterHabitant(this.chiffre,this.langue,this.annee,this.idRegion).subscribe(data=>{
        console.log('---------------gtttt', data);
        this.reloadPage()

        console.table('vcvcvvc'+ this.adama, this.ann);
      })
    }
  }

  Commentaire(){
    if (this.commentaire==''){
      alert('nonnnn');
    }else{
      alert('biennnnn')
      this.service.commentaire(this.commentaire,this.idRegion,this.moi).subscribe(data=>{
        console.log('je suis partie',data);
        this.reloadPage();
      })
    }
  }










  reloadPage(): void{
    window.location.reload();
  }



}
