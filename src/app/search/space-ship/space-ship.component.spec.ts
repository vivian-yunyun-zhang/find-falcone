import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Planet } from '../../shared/models/planet.model';
import { SpaceShip } from '../../shared/models/space-ship.model';
import { SpaceShipMessageService } from '../services/space-ship-message.service';
import {MatRadioModule,MatRadioGroup} from '@angular/material/radio';
import { SpaceShipComponent } from './space-ship.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export class MatRadioChangeStubEvent{
  constructor(public value:any){}
}

describe('SpaceShipComponent', () => {
  let component: SpaceShipComponent;
  let fixture: ComponentFixture<SpaceShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SpaceShipComponent,
        MatRadioGroup ],
      imports: [
        MatRadioModule,
        FormsModule,
        MatRadioModule,ReactiveFormsModule
        ],
        schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceShipComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should create SpaceShipMessageService instance', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);

    fixture.detectChanges();
    expect(service).toBeTruthy();
  });

  it('SpaceShipMessageService.getMessage() should update total_no property 2 to 1', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);
    let message:any={act:"add",message:"Space pod"};
    component.spaceShips = [new SpaceShip("Space pod",2,200,2)];
    
    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.spaceShips[0].total_no).toBe(1);
  });

  it('SpaceShipMessageService.getMessage() should update total_no property 0 to 1', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);
    let message:any={act:"remove",message:"Space pod"};
    component.spaceShips = [new SpaceShip("Space pod",0,200,2)];
    
    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.spaceShips[0].total_no).toBe(1);
  });

  it('SpaceShipMessageService.getMessage() should NOT update total_no property when message is null', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);
    let message:any;
    component.spaceShips = [new SpaceShip("Space pod",0,200,2)];
    
    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.spaceShips[0].total_no).toBe(0);
  });

  it('SpaceShipMessageService.getMessage() should NOT update total_no property when name NOT match', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);
    let message:any={act:"remove",message:"Space pod"};
    component.spaceShips = [new SpaceShip("Space rocket",0,200,2)];
    
    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.spaceShips[0].total_no).toBe(0);
  });

  it('SpaceShipMessageService.getMessage() should NOT update total_no property when total_no <=0', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);
    let message:any={act:"add",message:"Space pod"};
    component.spaceShips = [new SpaceShip("Space pod",0,200,2)];
    
    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.spaceShips[0].total_no).toBe(0);
  });

  it('SpaceShipMessageService.getMessage() should NOT update total_no property when act is NOT add or remove', () => {
    let service:SpaceShipMessageService = TestBed.get(SpaceShipMessageService);
    let message:any={act:"multiply",message:"Space pod"};
    component.spaceShips = [new SpaceShip("Space pod",0,200,2)];
    
    spyOn(service,'getMessage').and.returnValue(of(message));
    fixture.detectChanges();
    expect(component.spaceShips[0].total_no).toBe(0);
  });

  it('should raise newSSEvent when a vehicle is selected', () => {
    let newSS:any;
    component.currentPlanet = new Planet("Donlon",100,false);
    component.selectedSS = new SpaceShip("Space pod",2,200,2);
    component.newSSEvent.subscribe(ns=>newSS = ns);
    component.addNewSS("Space pod");
    fixture.detectChanges();
    expect(newSS.value).toBe("Space pod");
  });

  it('should raise removeSSEvent when another vehicle is selected', () => {
    let SS:any;
    component.currentPlanet = new Planet("Donlon",100,false);
    component.selectedSS = new SpaceShip("Space pod",1,200,2);
    component.removeSSEvent.subscribe(ns=>SS = ns);
    component.removeNewSS("Space pod");
    fixture.detectChanges();
    expect(SS.value).toBe("Space pod");
  });

  it('should clear vehicle selection', () => {
    component.selectedSS = new SpaceShip("Space pod",2,200,2);

    component.clearRadioButtonSelection();

    fixture.detectChanges();
    expect(component.selectedSS).toBeNull;
  });

  it('should clear vehicle selection with NO selectedSS', () => {
    component.clearRadioButtonSelection();

    fixture.detectChanges();
    expect(component.selectedSS).toBeNull;
  });

  it('should raise change event with NO event value', () => {
    component.spaceShips = [new SpaceShip('Space pod',2,200,2),new SpaceShip('Space rocket',1,300,4)];
    component.selectedSS = new SpaceShip('Space pod',2,200,2);
    
    component.radioChange(new MatRadioChangeStubEvent(null));
    fixture.detectChanges();

    expect(component.selectedSS).toEqual(new SpaceShip('Space pod',2,200,2));
  });

  it('should raise change event with event value', () => {
    component.spaceShips = [new SpaceShip('Space pod',2,200,2),new SpaceShip('Space rocket',1,300,4)];
    component.selectedSS = new SpaceShip('Space pod',2,200,2);
    
    component.radioChange(new MatRadioChangeStubEvent("Space rocket"));
    fixture.detectChanges();

    expect(component.selectedSS).toEqual(new SpaceShip('Space rocket',1,300,4));
  });

  it('should raise change event with event value and NO selectedSS', () => {
    component.spaceShips = [new SpaceShip('Space pod',2,200,2),new SpaceShip('Space rocket',1,300,4)];
    
    component.radioChange(new MatRadioChangeStubEvent("Space rocket"));
    fixture.detectChanges();

    expect(component.selectedSS).toEqual(new SpaceShip('Space rocket',1,300,4));
  });
});
