import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';
import { ActivatedRoute } from '@angular/router';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements OnInit, OnDestroy {

  private map!: L.Map;
  private newLat!: number;
  private newLng!: number;

  constructor(private markerService: MarkerService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.newLat = parseFloat(params["lat"]);
      this.newLng = parseFloat(params["lng"]);
    });
    this.initMap();
    this.markerService.addPreviewMarker(this.map,new L.LatLng(this.newLat,this.newLng));
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off(); // remove all event listeners
      this.map.remove(); // remove the map from DOM and memory
    }
  
    this.markerService.clearAllMarkers(); // Optional cleanup in the service
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.newLat, this.newLng ],
      zoom: 12
    });

    this.map.dragging.disable();
    this.map.scrollWheelZoom.disable();

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}

