import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { SpaceShip } from './space-ship.model';

@Injectable({
  providedIn: "root",
})
/**BandAdapter class
 * using Model-Adapter pattern, reduce coupling between API and front end and increase reusability.
 * adapt() takes a band item and build a band model instance out of it.
 */

export class SpaceShipAdapter implements Adapter<SpaceShip> {
    adapt(item:any){
              
        return new SpaceShip(item.name,item.total_no,item.max_distance,item.speed);
    }
}


