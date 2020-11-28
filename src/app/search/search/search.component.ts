import { Component, OnInit,ViewChildren,QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { Planet } from '../../shared/models/planet.model';
import { SpaceShip } from '../../shared/models/space-ship.model';
import { PlanetService } from '../../shared/services/planet.service';
import { SpaceShipService } from '../../shared/services/space-ship.service';
import { PlanetComponent } from '../planet/planet.component';
import { PlanetMessageService } from '../services/planet-message.service';
import { SpaceShipMessageService } from '../services/space-ship-message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  total_no_planets:number[]=[1,2,3,4];
  planetNames:string[]=[];
  spaceShipNames:string[]=[];
  currentPlanet:number=1;
  totalTime:number=0;
  IsSSComp:boolean=false;
  IsPlanetComp:boolean=false;
  planets:Planet[];
  spaceShips:SpaceShip[];
  updatedSpaceShips:SpaceShip[];
  
  @ViewChildren(PlanetComponent) planetComponentChildren: QueryList<PlanetComponent>;

  constructor(private pMessage:PlanetMessageService,
              private sMessage:SpaceShipMessageService,
              private router: Router,
              private planetService:PlanetService,
              private spaceShipService:SpaceShipService){}

  ngOnInit(){
    this.getPlanets();
    this.getSpaceships();
  }

  getPlanets(){
    this.planetService.getPlanet().subscribe((planets:Planet[])=>{
      this.planets = planets;
      
      //this.IsPlanetComp=true;
      if(this.planetComponentChildren)
        this.planetComponentChildren.forEach((child)=>{child.setPlanets();this.IsPlanetComp=true;});
    });
  }

  getSpaceships(){
    this.spaceShipService.getSpaceShips().subscribe((ss:SpaceShip[])=>{
      this.spaceShips = ss;
      this.updatedSpaceShips = ss;
      this.IsSSComp=true;
      
    });
  }

  onClickLaunch(){
    this.router.navigate(['/searchresult'],{state:{planets:this.planetNames,spaceships:this.spaceShipNames,totalTime:this.totalTime}});
  }
  resetSelection(){
    this.planetComponentChildren.forEach((child)=>{child.clearPlanetSelection()});
  }
  
  addPlanetMessage(m:string): void {
    // send message to subscribers via observable subject
    this.pMessage.sendMessage("add",m);
    //console.log("sending ADD message to planets comp:"+m);
  }

  removePlanetMessage(m:string): void {
    // send message to subscribers via observable subject
    this.pMessage.sendMessage("remove",m);
    //console.log("sending REMOVE message to planets comp:"+m);
  }

  clearPlanetMessages(): void {
    // clear messages
    this.pMessage.clearMessages();
  }

  clearShipMessages(): void {
    // clear messages
    this.sMessage.clearMessages();
  }

  addPlanet(newItem:string) {
    this.planetNames.push(newItem);
    this.addPlanetMessage(newItem);
    // console.log("size of planet array:"+this.planetNames.length);
    //  console.log("ADD planet:"+this.planetNames.join(","));
  }

  removePlanet(newItem:string) {
    const index: number = this.planetNames.indexOf(newItem);
    if (index !== -1) {
        this.planetNames.splice(index, 1);
    }
    this.removePlanetMessage(newItem);
    // console.log("size of planet array:"+this.planetNames.length);
    //  console.log("REMOVE planet:"+this.planetNames.join(","));
  }

  addSS(newItem:any){
    this.planetNames.map((p,index)=>{
      if(p==newItem.planet)
      this.spaceShipNames.splice(index, 0, newItem.value);
    });
    this.totalTime=this.totalTime+newItem.time;

    this.updatedSpaceShips.map((ss)=>{
      if(ss.name == newItem.value && ss.total_no>0){
        ss.total_no--;
      }
    });
    this.sMessage.sendMessage(this.updatedSpaceShips);

  }

  removeSS(newItem:any){
    const index: number = this.spaceShipNames.indexOf(newItem.value);
    if (index !== -1) {
        this.spaceShipNames.splice(index, 1);
    }
    this.totalTime = this.totalTime - newItem.time;

    this.updatedSpaceShips.map((ss)=>{
      if(ss.name == newItem.value){
        ss.total_no++;
      }
    });
    this.sMessage.sendMessage(this.updatedSpaceShips);
  }

}
