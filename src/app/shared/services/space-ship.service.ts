import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import {map} from 'rxjs/operators';
import { SpaceShipAdapter } from '../models/space-ship-adapter';
import { SpaceShip } from '../models/space-ship.model';

@Injectable({
  providedIn: 'root'
})
export class SpaceShipService {
  private baseUrl="https://findfalcone.herokuapp.com/vehicles";

  constructor(private http:HttpClient,private spaceShipAD:SpaceShipAdapter) { }

  getSpaceShips():Observable<SpaceShip[]>{
    return this.http.get(this.baseUrl).pipe(map(response =>{
      if(response){
        const array =  response as any[];

        const details = array.map(data => {
          //adapt each planet item in JSON
          this.spaceShipAD.adapt(data);
          return data;
        });
        return details;
      }
      }));
  }
}
