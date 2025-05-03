import { Routes } from '@angular/router';
import { AddLocationPageComponent } from './add-location-page/add-location-page.component';
import { DraggableMapComponent } from './draggable-map/draggable-map.component';

export const routes: Routes = [
    { path: '', component: DraggableMapComponent },
    { path: 'add', component: AddLocationPageComponent },

];
