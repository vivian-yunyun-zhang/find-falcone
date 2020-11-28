import { TestBed } from '@angular/core/testing';

import { SpaceShipMessageService } from './space-ship-message.service';

describe('SpaceShipMessageService', () => {
  let service: SpaceShipMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceShipMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear message', () => {
    service.sendMessage("this message");
    service.clearMessages();
    
    service.getMessage().subscribe(mes=>expect(mes).toBeNaN());
    
  });
});
