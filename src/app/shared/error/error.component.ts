import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage ='';

  constructor(private router:Router) { 
    
    if(this.router.getCurrentNavigation().extras.state)
      this.errorMessage = this.router.getCurrentNavigation().extras.state.message;
  }

  ngOnInit(): void {
  }

}
