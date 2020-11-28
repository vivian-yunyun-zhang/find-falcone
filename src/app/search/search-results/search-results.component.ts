import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/services/token.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  token:string;
  planets:string[];
  vehicle:string[];
  status:string;
  found_planet:string;
  totalTime:number;
  search_message:string;
  IsWait:boolean=true;

  constructor(private tokenService:TokenService,private router:Router,private searchService:SearchService) {
    if(this.router.getCurrentNavigation().extras.state){
      this.planets = this.router.getCurrentNavigation().extras.state.planets;
      this.vehicle = this.router.getCurrentNavigation().extras.state.spaceships;
      this.totalTime = this.router.getCurrentNavigation().extras.state.totalTime;
    }
   }

  ngOnInit(): void {
    
    this.tokenService.getToken().subscribe(data=>{
      this.token = data.token;
      if(this.token && this.planets && this.vehicle)
        this.findFalcone(this.token,this.planets,this.vehicle);
    });
  }

  startAgain(){
    this.router.navigate(['/search']);
  }

  findFalcone(token:string,planets:string[],vehicle:string[]){
    
    this.searchService.findFalcone(token,planets,vehicle).subscribe(data=>{
      this.status = data.status;
      this.found_planet=data.planet_name?"Falcone was found on: "+data.planet_name+".":"";
      if(this.status == "success")
      this.search_message = "Mission success! Congratulations on finding Falcone! King Shan is mighty pleased."
      else
        this.search_message="Mission failed! Falcone is still at large! King Shan is furious."
      this.IsWait=false;
    });

  }

}
