import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl="https://findfalcone.herokuapp.com/find";

  constructor(private http:HttpClient) { }

  findFalcone(token:string,planets:string[],spaceships:string[]){
    const headers = { 'Accept': 'application/json','Content-Type':'application/json' };
    const body={'token':token,
    'planet_names':planets,
      'vehicle_names':spaceships};
       
    return this.http.post<any>(this.baseUrl,body,{headers}).pipe(map(response=>response));
  }
}
