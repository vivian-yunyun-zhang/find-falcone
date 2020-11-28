import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';
import { SpaceShipListComponent } from './space-ship-list/space-ship-list.component';

const routes: Routes = [
  { path: 'spaceshiplist', component: SpaceShipListComponent },
  { path: 'error', component: ErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceShipListRoutingModule { }
