import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected search result', () => {
    const expectedResult:any={"planet_name":"Pingasor","status":"success"};
    
    service.findFalcone("",[],[]).subscribe(
      (response) => {
        expect(response.status).toEqual(expectedResult.status);
      }
    );

    const req = httpMock.expectOne("https://findfalcone.herokuapp.com/find");
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResult);
    httpMock.verify();
  });
});
