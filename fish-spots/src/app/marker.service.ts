import { Injectable } from '@angular/core';
import { Map, LatLng, marker, LayerGroup, layerGroup, popup } from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor() {
    this.currMarker = layerGroup();
    this.popupService = new PopupService();
  }

  private currMarker: LayerGroup;
  private popupService: PopupService;

  public addMarker(map: Map, latlng: LatLng): void {
    const m = marker([latlng.lat, latlng.lng]);
    this.popupService.addPopupToMarker(m);
    this.clearCurrMarker();
    this.currMarker.addLayer(m);

    this.currMarker.addTo(map);
  }

  private clearCurrMarker(): void {
    this.currMarker.clearLayers();
  }
}
