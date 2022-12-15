import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { BoardComponent } from './board/board.component';
import { DetailsComponent } from './details/details.component';
import { RegionComponent } from './region/region.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'region', component: RegionComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'board', component: BoardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
