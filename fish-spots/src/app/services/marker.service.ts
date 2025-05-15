import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Map, LatLng, marker, Marker, LayerGroup, layerGroup, Icon, MarkerOptions, Popup, popup } from 'leaflet';
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

  public addPreviewMarker(map:Map,latlng:LatLng):void {
    const m = marker([latlng.lat, latlng.lng]);
    this.addPreviewPopup(m,map);
    this.clearCurrMarker();
    this.currMarker.addLayer(m);

    this.currMarker.addTo(map);
  }

  public clearAllMarkers(): void {
    this.currMarker.clearLayers();
    this.locationMarkers.clearLayers();
  }

  public plotAllLocations(map:Map):void {
    const iconExisting = new Icon({
      iconUrl: '../assets/marker-colors/marker-icon-2x-green.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    const options:MarkerOptions = {
      icon:iconExisting
    }

    this.locationMarkers.clearLayers();
    let locationsObs:Observable<LocationDto[]> = this.apiClient.get<{ locations: LocationDto[] }>("Location").pipe(
      rxjsMap(response => response.locations)  // Extract 'locations' array from nested reponse
    );
    locationsObs.subscribe(locations => {
      locations.forEach(location => {
        const locLatLng:LatLng = new LatLng(Number(location.lat),Number(location.long));
        const m = marker([locLatLng.lat,locLatLng.lng],options);
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
    m.bindPopup(`<button class="add-button" onclick="window.goToAddPage({ lat: ${latlng.lat}, lng: ${latlng.lng} })">Add Location</>`)
    .on('add', function () {
      m.openPopup();
    });
  }

  private addLocationPopup(m: Marker,locName:string) {
    //TODO: Add onClick behavior

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

  // private addPreviewPopup(m:Marker,map:Map){
  //   var pop:Popup = popup({content:
  //     `
  //     <div class="location-preview">
  //       <img src="../assets/location.png"/ width=40px>
  //       <div><div/>
  //       <button class="location-button">[Location Name]</button>
  //     <div/>
  //     `
  //   });
  //   m.bindPopup(pop);
  //   pop.setLatLng(m.getLatLng()).openOn(map);
  // }

  private addPreviewPopup(m: Marker, map: Map): void {
    const content = `
      <div class="location-preview">
        <img src="../assets/location.png" width="40px" id="popupImage" />
        <div class="name-preview" id="popupName">[Location Name]</div>
      </div>
    `;

    const pop = popup({ content });
    m.bindPopup(pop);
    pop.setLatLng(m.getLatLng()).openOn(map);
  }

  public attachOnClickGlobalFunction(): void {
      // Leaflet doesn't have access to the Angular component contexts
      // so we have to attach to global 'window' scope
      (window as any).goToAddPage = (data: any) => {
        this.router.navigate(['/add'], { queryParams: { lat: data.lat, lng: data.lng } });
      };

      (window as any).goToLocationPage = (location: any) => {
        this.router.navigate(['/location', location.locationId], { state: location});
      };

      console.log("attaching globals end");
  }
}