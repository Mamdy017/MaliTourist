import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BoardComponent } from './board/board.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DetailsComponent } from './details/details.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
  { path: 'accueil/:idPays', component: AccueilComponent },
  { path: 'region', component: RegionComponent },
  { path: 'board', component: BoardComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
