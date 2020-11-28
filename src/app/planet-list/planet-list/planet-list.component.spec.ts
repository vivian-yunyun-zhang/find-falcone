import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlanetListComponent } from './planet-list.component';
import { PlanetService } from '../../shared/services/planet.service';
import { from } from 'rxjs';
import { Planet } from '../../shared/models/planet.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PlanetListComponent', () => {
  let component: PlanetListComponent;
  let fixture: ComponentFixture<PlanetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetListComponent ],
      imports: [HttpClientTestingModule],
      providers: [PlanetService],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetListComponent);
    component = fixture.componentInstance;
    
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

   it('should load planets from server', () => {
    const service: PlanetService = TestBed.get(PlanetService);

    spyOn(service,'getPlanet').and.returnValue(from([[new Planet('p1',100,false)]]))

    fixture.detectChanges();
    expect(component.planets.length).toBe(1);
   });
});
