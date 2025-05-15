import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationDto } from '../../../model/dto/LocationDto';
import { PhotoScrollerComponent } from "../../components/photo-scroller/photo-scroller.component";
import { LocationService } from '../../services/location.service';
import { ApiClientService } from '../../services/apiclient.service';

@Component({
  selector: 'app-location-page',
  imports: [PhotoScrollerComponent],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})

export class LocationPageComponent {
  location: LocationDto | null = null;
  title: string = "Loading";

  private readonly locationUrl = 'Location/';


  constructor(private route: ActivatedRoute, private locationService: LocationService, private apiClientService: ApiClientService) {}

  ngOnInit(): void {
    const navState = history.state.locationData;
    if (navState) {
      this.location = navState;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.apiClientService.get<LocationDto>(this.locationUrl + id).subscribe((response: LocationDto) => {
          console.log(response);
          console.log("locname " + response.locationName)
          this.title = "LOADED";
          this.title = response.locationName;
          this.location = {...response};
          console.log(this.location);
        });

        // this.locationService.getLocationById(id).subscribe((response: LocationDto) => {
        //   this.title = response.locationName;
        //   this.location = {...response};
        //   console.log(this.location);
        // });
      }
    }
  }

}