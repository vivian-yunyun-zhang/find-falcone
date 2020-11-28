import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';

class RouterStub{
  navigate(params){

  }
}

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundComponent ],
      imports:[HttpClientTestingModule],
      providers:[{provide:Router,useClass:RouterStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate user to search page', () => {
    let router = TestBed.get(Router);
    
    let spy = spyOn(router,'navigate');
    component.search();
  
    expect(spy).toHaveBeenCalledWith(['/search']);
  });
});
