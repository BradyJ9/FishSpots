import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Map, LatLng, marker, Marker, LayerGroup, layerGroup } from 'leaflet';
import { IDaoFactory } from '../dao/IDaoFactory';
import { DaoFactory } from '../dao/DaoFactory';
import { ApiClientService } from './apiclient.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  private daoFactory:IDaoFactory = new DaoFactory();
  constructor(
    private router: Router, 
    private apiClient: ApiClientService) {
    this.currMarker = layerGroup();
    this.locationMarkers = layerGroup();
  }

  private currMarker: LayerGroup;
  private locationMarkers: LayerGroup;

  public addMarker(map: Map, latlng: LatLng): void {
    const m = marker([latlng.lat, latlng.lng]);
    this.addPopupToMarker(m);
    this.clearCurrMarker();
    this.currMarker.addLayer(m);

    this.currMarker.addTo(map);
  }

  public async plotAllLocations(map:Map):Promise<void> {
    this.daoFactory.createLocationDao(this.apiClient).getLocations().subscribe(locations => {
      locations.forEach(location => {
        const locLatLng:LatLng = new LatLng(Number(location.lat),Number(location.long));
        const m = marker([locLatLng.lat,locLatLng.lng]);
        this.locationMarkers.addLayer(m);
      });
      this.locationMarkers.addTo(map);
    });
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
