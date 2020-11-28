import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
      
    });
    service = TestBed.inject(TokenService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected token', () => {
    const expectedToken: any ={"token":"UqANBeZcboxpvpShpcjBWchIoBQZKEDg"};
    
    service.getToken().subscribe(
      (response) => {
        expect(response.token).toEqual(expectedToken.token);
      }
    );

    const req = httpMock.expectOne('https://findfalcone.herokuapp.com/token');
    expect(req.request.method).toEqual('POST');
    req.flush(expectedToken);
    httpMock.verify();
  });
});
