import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Map, LatLng, marker, Marker, LayerGroup, layerGroup } from 'leaflet';
import { ApiClientService } from './apiclient.service';
import { Observable, map as rxjsMap} from 'rxjs';
import { LocationDto } from '../../model/dto/LocationDto';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
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
    this.addButtonPopup(m);
    this.clearCurrMarker();
    this.currMarker.addLayer(m);

    this.currMarker.addTo(map);
  }

  public clearAllMarkers(): void {
    this.currMarker.clearLayers();
    this.locationMarkers.clearLayers();
  }

  public plotAllLocations(map:Map):void {
    this.locationMarkers.clearLayers();
    let locationsObs:Observable<LocationDto[]> = this.apiClient.get<{ locations: LocationDto[] }>("Location").pipe(
      rxjsMap(response => response.locations)  // Extract 'locations' array from nested reponse
    );
    locationsObs.subscribe(locations => {
      locations.forEach(location => {
        const locLatLng:LatLng = new LatLng(Number(location.lat),Number(location.long));
        const m = marker([locLatLng.lat,locLatLng.lng]);
        this.addLocationPopup(m,location.locationName);
        this.locationMarkers.addLayer(m);
      });
      this.locationMarkers.addTo(map);
    });
  }

  private clearCurrMarker(): void {
    this.currMarker.clearLayers();
  }

  private addButtonPopup(m:Marker): void {
    this.attachOnClickGlobalFunction();
    
    const latlng = m.getLatLng();
    m.bindPopup(`<button class="add-button" onclick="window.goToAddPage({ lat: ${latlng.lat}, lng: ${latlng.lng} })">Add</>`)
    .on('add', function () {
      m.openPopup();
    });
  }

  private addLocationPopup(m: Marker,locName:string) {
    //TODO: Add onClick behavior

    const latlng = m.getLatLng();
    m.bindPopup(
      //TODO: Replace placeholder location.png image with locationImage
      `
      <div class="location-preview">
        <img src="../assets/location.png"/ width=40px>
        <div><div/>
        <button class="location-button">${locName}</button>
      <div/>
      `
    );
  }

  private attachOnClickGlobalFunction(): void {
      // Leaflet doesn't have access to the Angular component contexts
      // so we have to attach to global 'window' scope
      (window as any).goToAddPage = (data: any) => {
        this.router.navigate(['/add'], { queryParams: { lat: data.lat, lng: data.lng } });
      };
  }
}
