import { Injectable } from '@angular/core';
import { Marker } from 'leaflet';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
    public addPopupToMarker(m:Marker): void {
        // TODO: This HTML stuff probably shouldn't all be in a service class - should make external component
        const add_popup = document.createElement('button');
        add_popup.className = 'add-button';
        add_popup.innerText = 'Add';
        
        m.bindPopup(add_popup).openPopup();
    }
}