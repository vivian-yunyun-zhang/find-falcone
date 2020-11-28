import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceShipListComponent } from './space-ship-list/space-ship-list.component';
import { SpaceShipListRoutingModule } from './space-ship-list-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SpaceShipListComponent],
  imports: [
    CommonModule,
    SpaceShipListRoutingModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class SpaceShipListModule { }
