import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { SpaceShip } from '../../shared/models/space-ship.model';
import { SpaceShipService } from '../../shared/services/space-ship.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpaceShipListComponent } from './space-ship-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SpaceShipListComponent', () => {
  let component: SpaceShipListComponent;
  let fixture: ComponentFixture<SpaceShipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        SpaceShipListComponent ],
      imports: [HttpClientTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceShipListComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load spaceships from server', () => {
    
    const service:SpaceShipService = TestBed.get(SpaceShipService);

    spyOn(service,'getSpaceShips').and.returnValue(from([[new SpaceShip('s1',1,200,2)]]))

    fixture.detectChanges();
    expect(component.spaceShips.length).toBe(1);
   });
});
