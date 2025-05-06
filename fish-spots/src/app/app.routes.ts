import { Routes } from '@angular/router';
import { AddLocationPageComponent } from './components/add-location-page/add-location-page.component';
import { DraggableMapComponent } from './components/draggable-map/draggable-map.component';

export const routes: Routes = [
    { path: '', component: DraggableMapComponent },
    { path: 'add', component: AddLocationPageComponent },

];
