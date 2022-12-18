import { PaysModele } from "./pays-modele";

export class RegionModele {

  idEntite!: number;
    nom!: string;
    description!: string;
    activite!: string;
    code_region!: string;
    superficie!: string;
    idPays!: PaysModele
}
export class Fichier {
  photoentite!: string;
  file!:File;
}
