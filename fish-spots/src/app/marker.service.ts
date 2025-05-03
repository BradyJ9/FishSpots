import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Map, LatLng, marker, Marker, LayerGroup, layerGroup, popup, Popup } from 'leaflet';

// declare global {
//   interface Window {
//      goToAddPage: (data: any) => void;
//   }
// }

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  constructor(private router: Router) {
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
    this.attachOnClickGlobalFunction();
    
    const latlng = m.getLatLng();
    m.bindPopup(`<button class="add-button" onclick="window.goToAddPage({ lat: ${latlng.lat}, lng: ${latlng.lng} })">Add</>`)
    .on('add', function () {
      m.openPopup();
    });
  }

  private attachOnClickGlobalFunction(): void {
      // Leaflet doesn't have access to the Angular component contexts
      // so we have to attach to global 'window' scope
      (window as any).goToAddPage = (data: any) => {
        this.router.navigate(['/add'], { queryParams: { lat: data.lat, lng: data.lng } });
      };
  }
}
