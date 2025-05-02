import { AfterViewInit, Component } from '@angular/core';
import { MarkerService } from '../marker.service'
import * as L from 'leaflet';

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
export class DraggableMapComponent implements AfterViewInit {

  private map!: L.Map;

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.map.on('click', this.onMapClick)
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

