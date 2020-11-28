import { Component, Input, OnInit,Output,EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Planet } from '../../shared/models/planet.model';
import {Observable,Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PlanetMessageService } from '../services/planet-message.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})

export class PlanetComponent implements OnInit, OnDestroy {
  @Input() planets:Planet[]=[];
  myControl = new FormControl();
  filteredOptions: Observable<Planet[]>;
  // set 10000 as distance, so that all vehicles are disabled initially
  selectedPlanet:Planet= new Planet('',10000,false);
  subscription: Subscription;
  @Input() total_no_planets:number;
  @Input() current_planet_no:string;

  constructor(private messageService:PlanetMessageService) { }

  ngOnInit(): void {
      // subscribe to app component messages
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
       //update planet availability based on user's selection
       
        this.planets.map(p=>{
          if(p.name==message.message){
            if(message.act == "add"){
              p.disable=true;
            }
            else{
              p.disable=false;
            }
          }
            
        });
      } 
    });
    
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
setPlanets(){
  this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
}
  private _filter(value:string): Planet[] {
    const filterValue = value.toLowerCase();

    return this.planets.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectionChange(event){
    
    //console.log('onSelectionChange called', event.option.value);
    if(event.option.value){
     // this.showSpaceShips=true;
    
      if(this.selectedPlanet.name!=''){
        //console.log("this.selectedPlanet:"+this.selectedPlanet.name);
        this.removeCurrentPlanet(this.selectedPlanet.name);
      }
             
      this.selectedPlanet=this.planets.find(p=>p.name===event.option.value);
      this.clearRadioButton();
      this.addNewPlanet(event.option.value);
    }
  }

  @Output() newPlanetEvent = new EventEmitter<string>();
  @Output() removePlanetEvent = new EventEmitter<string>();
  @Output() clearRadioButtonEvent = new EventEmitter();

  clearRadioButton() {
    this.clearRadioButtonEvent.emit();
  }

  clearPlanetSelection(){
    if (this.selectedPlanet.name!=""){
      this.myControl.setValue('');
    
      this.removeCurrentPlanet(this.selectedPlanet.name);
      this.selectedPlanet=new Planet('',10000,false);
    }
    this.clearRadioButton();
  }

  addNewPlanet(value:string) {
    this.newPlanetEvent.emit(value);
  }

  removeCurrentPlanet(value:string) {
    this.removePlanetEvent.emit(value);
  }

}
