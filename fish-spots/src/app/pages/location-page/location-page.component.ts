import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationDto } from '../../../model/dto/LocationDto';
import { PhotoScrollerComponent } from "../../components/photo-scroller/photo-scroller.component";
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { OutingDto } from '../../../model/dto/OutingDto';
import { OutingService } from '../../services/outing.service';
import { OutingBarComponent } from "../../components/outing-bar/outing-bar.component";
import { AddOutingDialogComponent } from '../../components/add-outing-dialog/add-outing-dialog.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LocationImageService } from '../../services/locationimage.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OutingFormData } from '../../../model/dto/OutingFormData';

@Component({
  selector: 'app-location-page',
  imports: [PhotoScrollerComponent, CommonModule, OutingBarComponent, NavbarComponent,MatDialogModule],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})

export class LocationPageComponent {
  location: LocationDto | null = null;
  title: string = "Loading";
  outings$: Observable<OutingDto[]>;

  private locationIdSubject = new ReplaySubject<number|undefined>(1); // replays last value to new subscribers
  public fetchImageUrls$!:Observable<string[]>;
  
  constructor(private route: ActivatedRoute, private locationService: LocationService, private outingService: OutingService,
    private dialog: MatDialog, private locationImageService: LocationImageService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.outings$ = this.outingService.getOutingsByLocationId$(id ?? '');
  }

  ngOnInit(): void {
    const navState = history.state.locationData;
    if (navState) {
      this.location = navState;
      this.title = navState.locationName;
      this.locationIdSubject.next(navState.locationId);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.locationService.getLocationById(id).subscribe((response: LocationDto) => {
          this.title = response.locationName;
          this.location = { ...response };
          this.locationIdSubject.next(response.locationId);
        });
      }
    }

    this.fetchImageUrls$ = this.locationIdSubject.pipe(
      switchMap(locationId =>
        this.locationImageService.getImageUrlsByLocationId(locationId).pipe(
          tap(() => console.log('image urls fetched'))
        )
      )
    );
  }

  public addOutingOpenDialog() {
    const dialogRef = this.dialog.open(AddOutingDialogComponent, {
      width: '80vw',
      height: '90vh',
      maxWidth: 'none',
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((formData: OutingFormData) => {
      if (formData !== null) {
        console.log("form data received: " + formData);
        const outing: OutingDto = {
          locationId: this.location?.locationId ?? 0,
          //notes: formData.notes,
          outingDate: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime
        };

        this.locationService.insertOutingByLocationId(this.location?.locationId ?? 0, outing, formData.catches).subscribe({
          next: (newOuting) => {
            console.log("New outing added:", newOuting);
          },
          error: (err) => {
            console.error("Error adding outing:", err);
          }
        });
      }
    })

  }
}