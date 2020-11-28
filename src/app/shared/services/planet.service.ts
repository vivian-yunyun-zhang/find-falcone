import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Planet } from '../models/planet.model';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { PlanetAdapter } from '../models/planet-adapter';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private baseUrl="https://findfalcone.herokuapp.com/planets";

  constructor(private http:HttpClient,private planetAD:PlanetAdapter) { }

  getPlanet():Observable<Planet[]>{
    return this.http.get(this.baseUrl).pipe(map(response =>{
      if(response){
        const array =  response as any[];

        const details = array.map(data => {
          //adapt each planet item in JSON
          this.planetAD.adapt(data);
          return data;
        });
        return details;
      }
      }));
  }
}
