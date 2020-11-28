import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TokenService } from '../../shared/services/token.service';
import { SearchService } from '../services/search.service';

import { SearchResultsComponent } from './search-results.component';

// class RouterStub{
//   navigate(params){

//   }
//   getCurrentNavigation(){
//     return {extras:{state:{planets:[],spaceships:[],totalTime:600}}};
//   }
// }

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsComponent ],
      providers:[TokenService,SearchService,
      //  {provide:Router,useClass:RouterStub}
      ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    
   router = TestBed.get(Router);
  });

  it('should create', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load token from server', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    const service:TokenService = TestBed.get(TokenService);
    component.token="";
    spyOn(service,'getToken').and.returnValue(of({token:"UqANBeZcboxpvpShpcjBWchIoBQZKEDg"}));

    fixture.detectChanges();
    expect(component.token).toBe("UqANBeZcboxpvpShpcjBWchIoBQZKEDg");
   });

   it('should call findFalcone()', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.token="";
    component.planets=['Donlon','Enchai','Jebing','Sapir'];
    component.vehicle=['Space pod','Space rocket','Space shuttle','Space ship'];
    const service:TokenService = TestBed.get(TokenService);
    
    spyOn(service,'getToken').and.returnValue(of({token:"UqANBeZcboxpvpShpcjBWchIoBQZKEDg"}));
    let spy = spyOn(component,'findFalcone');
    
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
   });

   it('should NOT call findFalcone()', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.token="";
    component.planets=null;
    component.vehicle=['Space pod','Space rocket','Space shuttle','Space ship'];
    const service:TokenService = TestBed.get(TokenService);
    
    spyOn(service,'getToken').and.returnValue(of({token:"UqANBeZcboxpvpShpcjBWchIoBQZKEDg"}));
    let spy = spyOn(component,'findFalcone');
    
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
   });

   it('should load success search results from server', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    const service:SearchService = TestBed.get(SearchService);
    component.status="";
    spyOn(service,'findFalcone').and.returnValue(of({planet_name:"Jebing",status:"success"}));
    component.findFalcone("",[],[]);
    
    expect(component.status).toBe("success");
   });

   it('should load fail search results from server', () => {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    const service:SearchService = TestBed.get(SearchService);
    component.status="";
    spyOn(service,'findFalcone').and.returnValue(of({status:"false"}));
    component.findFalcone("",[],[]);
  
    expect(component.status).toBe("false");
   });

   it('should redirect the user to the search age', () => {
    
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { planets: [],vehical:[],totalTime:[]} } } as any);
    let spy = spyOn(router,'navigate');
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    
    component.startAgain()
  
    expect(spy).toHaveBeenCalledWith(['/search']);
   });

   it('should not assign this.planets', () => {
   
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: {  } } as any);
    
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
        
    fixture.detectChanges();
    expect(component.planets).not.toBeDefined();
   });
});
