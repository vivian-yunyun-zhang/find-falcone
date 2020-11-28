import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})
export class ErrorService implements ErrorHandler{
  
  constructor(private injector:Injector,private zone: NgZone) { }
  handleError(error: any) {
    const router = this.injector.get(Router);
    let errorMessage = '';
  
    console.error("error service:an error occurred here...");
    console.log(error);
    errorMessage = error;
    
    this.zone.run(() => {
      router.navigate(['/error'],{state:{message:errorMessage}});
    });
    
  }
}
