import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetListRoutingModule } from './planet-list-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [PlanetListComponent],
  imports: [
    CommonModule,
    PlanetListRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class PlanetListModule { }
