export class PaysModele {
  id!: number;
  nom!: string;
  capital!: string;
  superficie!: string;
  drapeau!: string;
  // image2 !:string;
  constructor(init : Partial<PaysModele>){
    Object.assign(this, init)
  }
}
export class Fichier {

  // drapeau!: string;
  // file:File | undefined;
}
