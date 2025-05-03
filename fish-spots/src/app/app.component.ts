import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DraggableMapComponent } from "./draggable-map/draggable-map.component";
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fish-spots';
}
