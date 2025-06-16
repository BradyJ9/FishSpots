import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationDto } from '../../../model/dto/LocationDto';
import { PhotoScrollerComponent } from "../../components/photo-scroller/photo-scroller.component";
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { OutingDto } from '../../../model/dto/OutingDto';
import { OutingService } from '../../services/outing.service';
import { OutingBarComponent } from "../../components/outing-bar/outing-bar.component";
import { AddOutingDialogComponent } from '../../components/add-outing-dialog/add-outing-dialog.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LocationImageService } from '../../services/locationimage.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OutingFormData } from '../../../model/dto/OutingFormData';
import { CatchService } from '../../services/catch.service';

@Component({
  selector: 'app-location-page',
  imports: [PhotoScrollerComponent, CommonModule, OutingBarComponent, NavbarComponent,MatDialogModule],
  templateUrl: './location-page.component.html',
  styleUrl: './location-page.component.css'
})

export class LocationPageComponent {
  location: LocationDto | null = null;
  title: string = "Loading";
  outings$!: Observable<OutingDto[]>;
  isSubmitting: boolean = false;

  private locationIdSubject = new ReplaySubject<number|undefined>(1); // replays last value to new subscribers
  public fetchImageUrls$!:Observable<string[]>;
  
  constructor(private route: ActivatedRoute, private locationService: LocationService, private outingService: OutingService,
    private catchService: CatchService, private dialog: MatDialog, private locationImageService: LocationImageService) {}

  ngOnInit(): void {
    const navState = history.state.locationData;
    const id = this.route.snapshot.paramMap.get('id');
    if (navState) {
      this.location = navState;
      this.title = navState.locationName;
      this.locationIdSubject.next(navState.locationId);
    } else {
      if (id) {
        this.locationService.getLocationById(id).subscribe((response: LocationDto) => {
          this.title = response.locationName;
          this.location = { ...response };
          this.locationIdSubject.next(response.locationId);
        });
      }
    }

    this.outings$ = this.outingService.getOutingsByLocationId$(id ?? '');

    this.fetchImageUrls$ = this.locationIdSubject.pipe(
      switchMap(locationId =>
        this.locationImageService.getImageUrlsByLocationId(locationId).pipe()
      )
    );
  }

  public addOutingOpenDialog() {
    const dialogRef = this.dialog.open(AddOutingDialogComponent, {
      width: '80vw',
      height: '90vh',
      maxWidth: 'none',
      disableClose: true,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(async (formData: OutingFormData) => {
      if (formData !== null) {
        this.isSubmitting = true;

        const outing: OutingDto = {
          locationId: this.location?.locationId ?? 0,
          username: formData.username,
          notes: formData.notes,
          outingDate: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime
        };

        try {
          await this.catchService.uploadCatchImagesAndAssignUrl(formData.catchImages, formData.catches);

          this.locationService.insertOutingByLocationId(this.location?.locationId ?? 0, outing, formData.catches).pipe(
          switchMap(() =>
            this.outingService.getOutingsByLocationId$(this.location?.locationId?.toString() ?? '')
          )
          ).subscribe({
          next: (outings) => {
            this.outings$ = of(outings);
            this.isSubmitting = false; // Hide loader
          },
          error: (err) => {
            console.error("Error adding outing:", err);
            alert("Error adding outing: " + err);
            this.isSubmitting = false; // Hide loader
          }
          });
        } catch (err) {
          console.error("Error uploading catch images:", err);
          alert("Error uploading catch images: " + err);
          this.isSubmitting = false; // Hide loader
        }
      }
    });
  }
}