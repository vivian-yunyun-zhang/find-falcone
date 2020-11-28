import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorComponent } from './error.component';

// class RouterStub{
//   getCurrentNavigation(){
//     return {extras:{state:{}}};
//   }
// }

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorComponent ],
      imports:[RouterTestingModule]
     // providers:[{provide:Router,useClass:RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    
    
  });

  it('should create', () => {
    
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { message: 'this message'} } } as any);
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should NOT get errorMessage', () => {
    
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: {  } } as any);
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.errorMessage).not.toBe('this message');
  });
  
  it('should get errorMessage', () => {
    
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { message: 'this message'} } } as any);
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.errorMessage).toBe('this message');
  });
});
