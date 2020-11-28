import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpaceShipService } from './space-ship.service';
import { SpaceShip } from '../models/space-ship.model';

describe('SpaceShipService', () => {
  let service: SpaceShipService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SpaceShipService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected vehicles', () => {
    const expectedVehicles:SpaceShip[] =[new SpaceShip("Space pod",2,200,2)];
    
    service.getSpaceShips().subscribe(
      (response) => {
        expect(response[0].name).toEqual(expectedVehicles[0].name);
      }
    );

    const req = httpMock.expectOne("https://findfalcone.herokuapp.com/vehicles");
    expect(req.request.method).toEqual('GET');
    req.flush(expectedVehicles);
    httpMock.verify();
  });

  it('should return EMPTY vehicles', () => {
    const expectedVehicles:SpaceShip[] =null;
    
    service.getSpaceShips().subscribe(
      (response) => {
        expect(response).toBeNull;
      }
    );

    const req = httpMock.expectOne("https://findfalcone.herokuapp.com/vehicles");
    expect(req.request.method).toEqual('GET');
    req.flush(expectedVehicles);
    httpMock.verify();
  });
});
