import { Routes } from '@angular/router';
import { AddLocationPageComponent } from './pages/add-location-page/add-location-page.component';
import { DraggableMapComponent } from './components/draggable-map/draggable-map.component';
import { LocationPageComponent } from './pages/location-page/location-page.component';

export const routes: Routes = [
    { path: '', component: DraggableMapComponent },
    { path: 'add', component: AddLocationPageComponent },
    { path: 'location/:id', component: LocationPageComponent}
];
