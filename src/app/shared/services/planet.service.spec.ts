import { TestBed } from '@angular/core/testing';
import { PlanetService } from './planet.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanetAdapter } from '../models/planet-adapter';
import { Planet } from '../models/planet.model';


describe('PlanetService', () => {
  let service: PlanetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PlanetService,PlanetAdapter]
    });
    service = TestBed.inject(PlanetService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    service = TestBed.get(PlanetService);
    expect(service).toBeTruthy();
  });

  it('should return expected planets', () => {
    const expectedPlanets:Planet[] =[new Planet("Donlon",100,false)];
    
    service.getPlanet().subscribe(
      (response) => {
        expect(response[0].name).toEqual(expectedPlanets[0].name);
      }
    );

    const req = httpMock.expectOne("https://findfalcone.herokuapp.com/planets");
    expect(req.request.method).toEqual('GET');
    req.flush(expectedPlanets);
    httpMock.verify();
  });

  it('should return null planets', () => {
    let expectedPlanets:Planet[]=null;
    
    service.getPlanet().subscribe(
      (response) => {
        expect(response).toBeUndefined();
      }
    );

    const req = httpMock.expectOne("https://findfalcone.herokuapp.com/planets");
    expect(req.request.method).toEqual('GET');
    req.flush(expectedPlanets);
    httpMock.verify();
  });
});
