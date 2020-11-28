import { Component, OnInit } from '@angular/core';
import { SpaceShip } from '../../shared/models/space-ship.model';
import { SpaceShipService } from '../../shared/services/space-ship.service';

@Component({
  selector: 'app-space-ship-list',
  templateUrl: './space-ship-list.component.html',
  styleUrls: ['./space-ship-list.component.css']
})
export class SpaceShipListComponent implements OnInit {
  spaceShips:SpaceShip[];
  IsWait:boolean=true;

  constructor(private service:SpaceShipService) { }

  ngOnInit(): void {
    this.service.getSpaceShips().subscribe((spaceships:SpaceShip[])=>{
      
      this.spaceShips = spaceships;
      this.IsWait=false;
    });
  }

}
