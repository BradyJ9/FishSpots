import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../../services/marker.service';

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
  selector: 'draggable-map',
  templateUrl: './draggable-map.component.html',
  styleUrls: ['./draggable-map.component.css']
})
export class DraggableMapComponent implements OnInit, OnDestroy {

  private map!: L.Map;

  constructor(private markerService: MarkerService) { }

  ngOnInit(): void {
    this.initMap();
    this.map.on('click', this.onMapClick);
    this.markerService.plotAllLocations(this.map);  
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off(); // remove all event listeners
      this.map.remove(); // remove the map from DOM and memory
    }
  
    this.markerService.clearAllMarkers(); // Optional cleanup in the service
  }

  private onMapClick = (e: L.LeafletMouseEvent): void => {
    this.markerService.addMarker(this.map, e.latlng);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -111.5795 ],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
}

