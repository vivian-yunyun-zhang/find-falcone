import { async, inject, TestBed } from '@angular/core/testing';

import { PlanetMessageService } from './planet-message.service';

describe('PlanetMessageService', () => {
  let service: PlanetMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear message', () => {
    service.sendMessage("act","add");
    service.clearMessages();
    
    service.getMessage().subscribe(mes=>{
      expect(mes).toBeNaN();
    });
    
  });
 
});
