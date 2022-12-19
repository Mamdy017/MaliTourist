import { PaysModele } from "./pays-modele";

export class RegionModele {

  idRegion!: number;
    nom!: string;
    description!: string;
    activite!: string;
    code_region!: string;
    superficie!: string;
    pays!: PaysModele;
    img1! : string;
    img2! : string ;
    img3!:string;
   constructor(init: Partial<RegionModele>){
    Object.assign(this, init)
   } 
}
// export class Fichier {
//   photoentite!: string;
//   file!:File;
// }
