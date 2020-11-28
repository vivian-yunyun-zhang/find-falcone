import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Planet } from '../../shared/models/planet.model';
import {  of } from 'rxjs';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { PlanetComponent } from './planet.component';
import { PlanetMessageService } from '../services/planet-message.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export class MatAutocompleteSelectedStubEvent{
  constructor(public option:any){}
}

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[MatAutocompleteModule,ReactiveFormsModule,FormsModule],
      declarations: [ PlanetComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create PlanetMessageService instance', () => {
    let service:PlanetMessageService = TestBed.get(PlanetMessageService);

    fixture.detectChanges();
    expect(service).toBeTruthy();
  });

  it('PlanetMessageService.getMessage() should update disabled property false to true', () => {
    let service:PlanetMessageService = TestBed.get(PlanetMessageService);
    let message:any={act:"add",message:"Donlon"};
    component.planets = [new Planet("Donlon",100,false)];
    

    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.planets[0].disable).toBe(true);
});

it('PlanetMessageService.getMessage() should update disabled property true to false', () => {
  let service:PlanetMessageService = TestBed.get(PlanetMessageService);
  let message:any={act:"remove",message:"Donlon"};
  component.planets = [new Planet("Donlon",100,true)];
  

  spyOn(service,'getMessage').and.returnValue(of(message));
  fixture.detectChanges();
  expect(component.planets[0].disable).toBe(false);
});

it('PlanetMessageService.getMessage() should NOT update', () => {
  let service:PlanetMessageService = TestBed.get(PlanetMessageService);
  let message:any=null;
  component.planets = [new Planet("Donlon",100,true)];
  

  spyOn(service,'getMessage').and.returnValue(of(message));
  fixture.detectChanges();
  expect(component.planets[0].disable).toBe(true);
});

it('PlanetMessageService.getMessage() should NOT update Disable when planet does not match', () => {
  let service:PlanetMessageService = TestBed.get(PlanetMessageService);
  let message:any={act:"remove",message:"Donlon"};;
  component.planets = [new Planet("Enchai",100,true)];
  

  spyOn(service,'getMessage').and.returnValue(of(message));
  fixture.detectChanges();
  expect(component.planets[0].disable).toBe(true);
});

  it('should set filteredOptions', () => {
    component.planets = [new Planet("Donlon",100,true)];
    let len:number=0;
    
    component.setPlanets();
    component.filteredOptions.subscribe(p=>{len++});
    fixture.detectChanges();
    expect(len).toBe(1);
  });

  it('should raise newPlanetEvent when a planet is selected', () => {
    let newPlanet:string;
    component.newPlanetEvent.subscribe(np=>newPlanet = np);
    component.addNewPlanet("Donlon");
    fixture.detectChanges();
    expect(newPlanet).toBe("Donlon");
  });

  it('should raise removePlanetEvent when another planet is selected', () => {
    let planet:string;
    component.removePlanetEvent.subscribe(np=>planet = np);
    component.removeCurrentPlanet("Donlon");
    fixture.detectChanges();
    expect(planet).toBe("Donlon");
  });

  it('should clear planet selection', () => {
    component.selectedPlanet = new Planet('Donlon',100,true);

    component.clearPlanetSelection();

    fixture.detectChanges();
    expect(component.selectedPlanet).toEqual(new Planet('',10000,false));
  });

  it('should NOT clear planet selection', () => {
    component.selectedPlanet = new Planet('',10000,false);

    component.clearPlanetSelection();

    fixture.detectChanges();
    expect(component.selectedPlanet).toEqual(new Planet('',10000,false));
  });

  it('should raise onSelectionChange event with NO selectedPlanet', () => {
    component.planets = [new Planet('Donlon',100,false),new Planet('Enchai',200,false)];
    component.selectedPlanet = new Planet('',100,false);
    
    component.onSelectionChange(new MatAutocompleteSelectedStubEvent({value:"Donlon"}));
    fixture.detectChanges();

    expect(component.selectedPlanet).toEqual(new Planet('Donlon',100,false));
  });

  it('should raise onSelectionChange event with selectedPlanet', () => {
    component.planets = [new Planet('Donlon',100,false),new Planet('Enchai',200,false)];
    component.selectedPlanet = new Planet('Enchai',200,false);
    
    component.onSelectionChange(new MatAutocompleteSelectedStubEvent({value:"Donlon"}));
    fixture.detectChanges();

    expect(component.selectedPlanet).toEqual(new Planet('Donlon',100,false));
  });

  it('should raise onSelectionChange event with NO event value', () => {
    component.planets = [new Planet('Donlon',100,false),new Planet('Enchai',200,false)];
    component.selectedPlanet = new Planet('Enchai',200,false);
    
    component.onSelectionChange(new MatAutocompleteSelectedStubEvent({}));
    fixture.detectChanges();

    expect(component.selectedPlanet).toEqual(new Planet('Enchai',200,false));
  });
});