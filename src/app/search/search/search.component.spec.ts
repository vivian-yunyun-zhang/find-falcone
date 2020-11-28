import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlanetService } from '../../shared/services/planet.service';
import { SpaceShipService } from '../../shared/services/space-ship.service';
import { PlanetMessageService } from '../services/planet-message.service';
import { SpaceShipMessageService } from '../services/space-ship-message.service';
import { SearchComponent } from './search.component';
import {PlanetComponent} from '../planet/planet.component';
import {SpaceShipComponent} from '../space-ship/space-ship.component';
import { from } from 'rxjs';
import { Planet } from '../../shared/models/planet.model';
import { SpaceShip } from '../../shared/models/space-ship.model';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

class RouterStub{
  navigate(params){

  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SearchComponent,
        PlanetComponent,
        SpaceShipComponent ],
      imports: [
        HttpClientTestingModule,
        MatAutocompleteModule],
      providers:[
        PlanetService,
        PlanetMessageService,
        {provide:Router,useClass:RouterStub},
        SpaceShipMessageService,
        SpaceShipService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    fixture.detectChanges();
    //component.ngAfterViewInit();
    expect(component).toBeTruthy();
  });

  it('should load planets from server', () => {
    const service: PlanetService = TestBed.get(PlanetService);
    component.planets=[];
    spyOn(service,'getPlanet').and.returnValue(from([[new Planet('Donlon',100,false)]]))
    component.getPlanets();

    expect(component.planets.length).toBe(1);
   });

   it('#getPlanets() should set planets for planetComponent', () => {
    const service: PlanetService = TestBed.get(PlanetService);
    component.planets=[];
    spyOn(service,'getPlanet').and.returnValue(from([[new Planet('Donlon',100,false)]]))
    
    const spies = [];
    component.total_no_planets = [1,2,3,4];
    fixture.detectChanges();
    component.planetComponentChildren.forEach(d => {
      spies.push({
        spy: spyOn(d, 'setPlanets')
      });
    });

    component.getPlanets();

    spies.forEach(s=>{
      expect(s.spy).toHaveBeenCalled();
    })
   });

   it('should load vehicles from server', () => {
    const service:SpaceShipService = TestBed.get(SpaceShipService);
    component.spaceShips=[];
    spyOn(service,'getSpaceShips').and.returnValue(from([[new SpaceShip('Space pod',2,100,2)]]))
    component.getSpaceships();
    //fixture.detectChanges();
    expect(component.spaceShips.length).toBe(1);
   });

   it('#addPlanet()', () => {
    component.planetNames=[];
    
    component.addPlanet("Donlon");
    
    expect(component.planetNames[0]).toBe("Donlon");
   });

   it('#removePlanet() in planetNames array', () => {
    component.planetNames=["Donlon"];
    component.removePlanet("Donlon");

    expect(component.planetNames.length).toBe(0);
   });

   it('#removePlanet() NOT in planetNames array', () => {
    component.planetNames=["Donlon"];
    component.removePlanet("Enchai");

    expect(component.planetNames[0]).toBe("Donlon");
   });

   it('#addSS()', () => {
    component.spaceShipNames=[];
    component.planetNames=["Donlon"];
    component.addSS({planet:"Donlon",value:"Space pod"});

    expect(component.spaceShipNames[0]).toBe("Space pod");
   });

   it('#addSS() when planet is NOT in planetNames', () => {
    component.spaceShipNames=[];
    component.planetNames=["Donlon"];
    component.addSS({planet:"Enchai",value:"Space pod"});

    expect(component.spaceShipNames[0]).not.toBe("Space pod");
   });

   it('#removeSS()', () => {
    component.spaceShipNames=["Space pod"];
    component.planetNames=["Donlon"];
    component.removeSS({planet:"Donlon",value:"Space pod"});

    expect(component.spaceShipNames[0]).not.toBe("Space pod");
   });

   it('#removeSS() when vehicle is NOT in spaceShipNames', () => {
    component.spaceShipNames=["Space pod"];
    component.planetNames=["Donlon"];
    component.removeSS({planet:"Donlon",value:"Space ship"});

    expect(component.spaceShipNames[0]).toBe("Space pod");
   });

   it('#clearShipMessage() ', () => {
    
    component.clearShipMessages();

    let sm:SpaceShipMessageService = new SpaceShipMessageService();
    sm.getMessage().subscribe(mes=>expect(mes).toBeNaN());

   });

   it('#clearPlanetMessage() ', () => {
    
    component.clearPlanetMessages();

    let pm:PlanetMessageService = new PlanetMessageService();
    pm.getMessage().subscribe(mes=>expect(mes).toBeNaN());

   });

   it('#onClickLauch() ', () => {
    
    let router = TestBed.get(Router);
    
    let spy = spyOn(router,'navigate');
    component.onClickLaunch();
  
    expect(spy).toHaveBeenCalledWith(['/searchresult'],{state:{planets:[],spaceships:[],totalTime:0}});

   });

   it('#resetSelection() ', () => {
    const spies = [];
    component.total_no_planets = [1,2,3,4];
    fixture.detectChanges();
    component.planetComponentChildren.forEach(d => {
      spies.push({
        spy: spyOn(d, 'clearPlanetSelection')
      });
    });

    component.resetSelection();

    spies.forEach(s=>{
      expect(s.spy).toHaveBeenCalled();
    })
  });
});
