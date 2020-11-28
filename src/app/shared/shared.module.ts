import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {SharedRoutingModule} from './shared-routing.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ErrorComponent,PageNotFoundComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
