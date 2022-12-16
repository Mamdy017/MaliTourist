import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BoardComponent } from './board/board.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DetailsComponent } from './details/details.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'region', component: RegionComponent },
  { path: 'board', component: BoardComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'connexion', component: ConnexionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
