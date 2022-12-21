import { PaysModele } from "./pays-modele";

export class RegionModele {

  idRegion!: number;
    nom!: string;
    description!: string;
    activite!: string;
    code_region!: string;
    superficie!: string;
    pays!: PaysModele;
    image1! : string;
    image2! : string ;
    image3!:string;
   constructor(init: Partial<RegionModele>){
    Object.assign(this, init)
   } 
}
// export class Fichier {
//   photoentite!: string;
//   file!:File;
// }
