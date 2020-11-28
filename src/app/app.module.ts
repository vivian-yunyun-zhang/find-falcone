import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { SearchModule } from './search/search.module';
import {SharedModule} from './shared/shared.module';
import { PlanetListModule } from './planet-list/planet-list.module';
import { SpaceShipListModule } from './space-ship-list/space-ship-list.module';
import { HttpErrorInterceptor } from './shared/interceptors/httperror.interceptor';
import { ErrorService } from './shared/services/error.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
   // RouterModule.forRoot([]),
    SharedModule,
    LayoutModule,
    SearchModule,
    PlanetListModule,
    SpaceShipListModule,
    AppRoutingModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi:true
    },
    {provide:ErrorHandler,useClass:ErrorService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
