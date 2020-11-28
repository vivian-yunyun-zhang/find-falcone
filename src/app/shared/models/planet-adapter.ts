import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { Planet } from './planet.model';

@Injectable({
  providedIn: "root",
})
/**BandAdapter class
 * using Model-Adapter pattern, reduce coupling between API and front end and increase reusability.
 * adapt() takes a band item and build a band model instance out of it.
 */

export class PlanetAdapter implements Adapter<Planet> {
    adapt(item:any){
              
        return new Planet(item.name,item.distance,false);
    }
}

