import { PaysModele } from "./pays-modele";

export class RegionModele {

  id!: number;
    nom!: string;
    code_region!: string;
    activite!: string;
    superficie!: string;
    description!: string;
    // pays!: PaysModele;
    image1! : string;
    image2! : string ;
    image3!:string;
    idPays!:any;
  //  constructor(init: Partial<RegionModele>){
  //   Object.assign(this, init)
  //  } 
}
// export class Fichier {
//   photoentite!: string;
//   file!:File;
// }
