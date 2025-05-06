import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LatLng } from 'leaflet';

@Component({
  selector: 'app-add-location-page',
  imports: [],
  templateUrl: './add-location-page.component.html',
  styleUrl: './add-location-page.component.css'
})
export class AddLocationPageComponent {

  public newLat!: string;
  public newLng!: string;

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.newLat = params["lat"];
      this.newLng = params["lng"];
    });
  }

}
