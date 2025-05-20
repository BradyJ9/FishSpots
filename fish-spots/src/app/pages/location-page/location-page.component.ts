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
import { Dialog } from "@angular/cdk/dialog";
import { AddOutingDialogComponent } from '../../components/add-outing-dialog/add-outing-dialog.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LocationImageService } from '../../services/locationimage.service';

@Component({
  selector: 'app-location-page',
  imports: [PhotoScrollerComponent, CommonModule, OutingBarComponent, NavbarComponent],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})

export class LocationPageComponent {
  location: LocationDto | null = null;
  title: string = "Loading";
  outings$: Observable<OutingDto[]>;

  constructor(private route: ActivatedRoute, private locationService: LocationService, private outingService: OutingService,
    private dialog: Dialog, private locationImageService: LocationImageService) {
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
        });
      }
    }
  }

  public fetchLocationImageUrls = (): Observable<string[]> => {
    console.log("fetching location image urls");
    return this.locationImageService.getImageUrlsByLocationId(this.location?.locationId ?? null);
  }

  public addOutingOpenDialog() {
    this.dialog.open(AddOutingDialogComponent);
  }

}