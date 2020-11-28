import { Component, OnInit,Input,Output,EventEmitter, OnDestroy } from '@angular/core';
import { SpaceShip } from '../../shared/models/space-ship.model';
import {Subscription} from 'rxjs';
import { SpaceShipMessageService } from '../services/space-ship-message.service';
import { Planet } from '../../shared/models/planet.model';

@Component({
  selector: 'app-space-ship',
  templateUrl: './space-ship.component.html',
  styleUrls: ['./space-ship.component.css']
})
export class SpaceShipComponent implements OnInit,OnDestroy {
  @Input() spaceShips:SpaceShip[]=[];
  selectedSS:SpaceShip;
  subscription: Subscription;
  shipRadio:any;
  messageID:number;
  @Input() currentPlanet:Planet= new Planet("",0,false);

  constructor(private messageService:SpaceShipMessageService) { }

  ngOnInit(): void {
   
     //subscribe to spaceship messages service
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.spaceShips=message.message;
      } 
    });
    
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  @Output() newSSEvent = new EventEmitter<any>();
  @Output() removeSSEvent = new EventEmitter<any>();

  clearRadioButtonSelection(){
    this.shipRadio=null;
    if (this.selectedSS){
      this.removeNewSS(this.selectedSS.name);
      this.selectedSS=null;
    }
      
  }

  addNewSS(value:string) {
   
    this.newSSEvent.emit({planet:this.currentPlanet.name,value:value,time:this.currentPlanet.distance/this.selectedSS.speed});
  }
  removeNewSS(value:string) {
    this.removeSSEvent.emit({value:value,time:this.currentPlanet.distance/this.selectedSS.speed});
  }

  radioChange(event){
    //console.log(event.source.name, event.value);
    if(event.value){
      if(this.selectedSS){
        console.log("this.selectedSS name:"+this.selectedSS.name+";total number:"+this.selectedSS.total_no);
        this.removeNewSS(this.selectedSS.name);
      }
      this.selectedSS = this.spaceShips.find(p=>p.name===event.value);
      
      this.addNewSS(event.value);
    }
  }

}
