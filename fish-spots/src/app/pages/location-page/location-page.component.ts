import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationDto } from '../../../model/dto/LocationDto';
import { PhotoScrollerComponent } from "../../components/photo-scroller/photo-scroller.component";

@Component({
  selector: 'app-location-page',
  imports: [PhotoScrollerComponent],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})

export class LocationPageComponent {
  location: LocationDto | null = null;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    const navState = history.state.locationData;
    console.log("navstate");
    console.log(navState);
    if (navState) {
      this.location = navState;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      //this.locationService.getLocationWithDetails(id).subscribe(data => {
      //this.location = data;
      //});
    }
  }
  
}
