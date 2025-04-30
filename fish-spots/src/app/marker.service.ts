import { Injectable } from '@angular/core';
import { Map, LatLng, marker, LayerGroup, layerGroup } from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() { 
    this.currMarker = layerGroup();
  }

  private currMarker: LayerGroup;

  public addMarker(map: Map, latlng: LatLng): void {
    
    const m = marker([latlng.lat, latlng.lng]);
    this.clearCurrMarker();
    this.currMarker.addLayer(m);
    this.currMarker.addTo(map);
  }

  private clearCurrMarker(): void {
    this.currMarker.clearLayers();
  }
}
