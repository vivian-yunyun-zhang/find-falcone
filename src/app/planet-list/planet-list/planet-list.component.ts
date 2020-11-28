import { Component, OnInit } from '@angular/core';
import { Planet } from '../../shared/models/planet.model';
import { PlanetService } from '../../shared/services/planet.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {
  planets:Planet[];
  IsWait:boolean=true;

  constructor(private service:PlanetService) { }

  ngOnInit(): void {
    this.service.getPlanet().subscribe((planets:Planet[])=>{
      this.planets = planets;
      this.IsWait = false;
    });
  }

}
