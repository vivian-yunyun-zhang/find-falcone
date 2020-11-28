import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ErrorService } from './error.service';

class RouterStub{
  navigate(params){

  }
}

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[{provide:Router,useClass:RouterStub}]
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#handleError() should navigate to error page', () => {
    let router = TestBed.get(Router);
    let error:any;
    let spy = spyOn(router,'navigate');
    service.handleError(error);
  
    expect(spy).toHaveBeenCalledWith(['/error'],{state:{message:error}});
  });
});
