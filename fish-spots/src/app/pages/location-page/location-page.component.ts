import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationDto } from '../../../model/dto/LocationDto';
import { PhotoScrollerComponent } from "../../components/photo-scroller/photo-scroller.component";
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { OutingDto } from '../../../model/dto/OutingDto';
import { OutingService } from '../../services/outing.service';
import { OutingBarComponent } from "../../components/outing-bar/outing-bar.component";

@Component({
  selector: 'app-location-page',
  imports: [PhotoScrollerComponent, CommonModule, OutingBarComponent],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})

export class LocationPageComponent {
  location: LocationDto | null = null;
  title: string = "Loading";
  outings$: Observable<OutingDto[]>;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private outingService: OutingService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.outings$ = this.outingService.getOutingsByLocationId$(id ?? '');
  }

  ngOnInit(): void {
    const navState = history.state.locationData;
    if (navState) {
      this.location = navState;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.locationService.getLocationById(id).subscribe((response: LocationDto) => {
          this.title = response.locationName;
          this.location = {...response};
          console.log(this.location);
        });
      }
    }
  }

}