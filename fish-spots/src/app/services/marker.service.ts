import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Map, LatLng, marker, Marker, LayerGroup, layerGroup, Icon, MarkerOptions, popup } from 'leaflet';
import { Observable } from 'rxjs';
import { LocationDto } from '../../model/dto/LocationDto';
import { LocationService } from './location.service';
import { LocationImageService } from './locationimage.service';
import { LocationPreviewComponent } from '../components/location-preview/location-preview.component';

@Injectable({
  providedIn: 'root'
})

export class MarkerService {
  constructor(
    private router: Router, 
    private locationService: LocationService, private locationImageService:LocationImageService,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {
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
    let locationsObs:Observable<LocationDto[]> = this.locationService.getAllLocations();
    locationsObs.subscribe(locations => {
      locations.forEach(location => {
        const locLatLng:LatLng = new LatLng(Number(location.lat),Number(location.long));
        const m = marker([locLatLng.lat,locLatLng.lng],options);
        this.addLocationPopup(m,location);
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
    })
    .on('popupclose', () => {
      this.clearCurrMarker();
    });
  }

  private addLocationPopup(m:Marker,loc:LocationDto):void {
    this.locationImageService.getImageUrlsByLocationId(loc.locationId).subscribe((urls: string[]) => {
      const factory = this.resolver.resolveComponentFactory(LocationPreviewComponent);
      const componentRef = factory.create(this.injector);

      componentRef.instance.imageUrl = urls[0];
      componentRef.instance.locationId = loc.locationId!;
      componentRef.instance.locationName = loc.locationName;
      componentRef.instance.locationDescription = loc.locationDescription;

      this.appRef.attachView(componentRef.hostView);
      componentRef.changeDetectorRef.detectChanges();

      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

      m.bindPopup(domElem);

      m.on('popupclose', () => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
      });
    });
  }
  
  private addPreviewPopup(m: Marker, map: Map): void {
    const content = `
      <div class="location-preview" style="text-align: center;">
        <img src="../assets/location.png" width="40px" id="popupImage" />
        <div class="name-preview" id="popupName">[Location Name]</div>
        <div class="location-description" id="popupDescription">[Description]</div>
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

      (window as any).goToLocationPage = (data: { locationId: number }) => {
        this.router.navigate([`/location/${data.locationId}`]);
      };
  }
}
