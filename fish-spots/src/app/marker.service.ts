import { Injectable } from '@angular/core';
import { Map, LatLng, marker, Marker, LayerGroup, layerGroup, popup, Popup } from 'leaflet';

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
    this.addPopupToMarker(m);
    this.clearCurrMarker();
    this.currMarker.addLayer(m);

    this.currMarker.addTo(map);
  }

  private clearCurrMarker(): void {
    this.currMarker.clearLayers();
  }

  private addPopupToMarker(m:Marker): void {
    m.bindPopup("<button class=\"add-button\">Add</>").on('add', function () {
      m.openPopup();
    });
  }
}
