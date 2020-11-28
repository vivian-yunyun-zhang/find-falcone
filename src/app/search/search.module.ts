import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { PlanetComponent } from './planet/planet.component';
import { SpaceShipComponent } from './space-ship/space-ship.component';
import { PlanetService } from '../shared/services/planet.service';
import { SpaceShipService } from '../shared/services/space-ship.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchRoutingModule } from './search-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [SearchComponent,PlanetComponent,SpaceShipComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,SharedModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    SearchRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [
    PlanetService,
    SpaceShipService,
  ],
  exports:[SearchComponent]
})
export class SearchModule { }
