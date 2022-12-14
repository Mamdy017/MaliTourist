import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fichier, PaysModele } from '../modeles/pays-modele';
// import { Fichier, PaysModele } from '../modeles/pays-modele';
import { PaysServiceService } from '../service/pays-service.service';
import Swal from 'sweetalert2';
import { RegionServiceService } from '../service/region-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  pays:any;

  tsuperficie : any;

  Paysobjet: PaysModele = {
    id: 0,
    nom: '',
    capital: '',
    superficie: '',
    drapeau: '',
    // image2:'',
  }

  formmodule!: FormGroup;
  message: string | undefined;
  contenu: any;
  nom !: string;
  capital !: string;
  superficie !: string;
  file: any;
  idPays:any
  Region: any;
  totPop: any;
  totPop1: any;
  M: number | undefined;
  total: any;
  // file1: any;
  constructor(private service: PaysServiceService, private formB: FormBuilder, private region:RegionServiceService) { }

  ngOnInit(): void {
    this.formmodule = this.formB.group({
      nom: ["", Validators.required],
      file: ["", Validators.required],
      capital: ["", Validators.required],
      superficie: ["", Validators.required],
      file1: ["", Validators.required],
      // iduser:["",Validators.required]
    })
    this.service.afficherPays().subscribe(data => {
      this.pays = data;
      console.table(this.pays);
    });

    this.region.afficherRegion().subscribe(data => {
      this.Region = data;
      // console.table(this.region);
    });

    this.service.getAllSuperficie().subscribe(reponse => {
      this.tsuperficie = reponse;
       console.log(this.tsuperficie/100);
    })

    this.service.totPop().subscribe(response =>{
      this.totPop1=response;
      this.M=this.totPop1/1000000
      this.total=this.M.toFixed(2);
      console.log(this.M);
    })


  }



  fileChang(event: any) {
    this.file = event.target.files[0]
    console.log(event)

  }



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
        this.message = " Tous les champs sont obligatoire !",
      )
      // this.resetForm();
    } else {
      console.table("je suis" + this.nom + this.capital +this.superficie +this.file )
      swalWithBootstrapButtons.fire({
        title: 'Cet pays va etre ajoout??e !!!!',
        text: "Vous pouvez annuler ou confirmer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confimer!',
        cancelButtonText: 'Annuler!',


      }).then((result) => {
        if (result.isConfirmed) {
          this.service.ajouterPAys(this.Paysobjet.nom, this.Paysobjet.capital, this.Paysobjet.superficie, this.file).subscribe(data => {

              // this.route.navigateByUrl("/gestionentite")
              swalWithBootstrapButtons.fire(
                'Pays ajout?? avec succes!',
                'Vous ??tes diriger vers la liste des entit??s.',
                'success',)
                console.log("je suis la ======================================================================== ================================================================================================================================================================================================================================================================================================================================================================================================================================"+ this.Paysobjet);

           this.reloadPage();
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Ajout de l'entit?? annul??e"
          )

        }
      })

    }


    this.Paysobjet = this.formmodule.value
    let data = new FormData();

  }



reloadPage():void{
  window.location.reload();
}

}
