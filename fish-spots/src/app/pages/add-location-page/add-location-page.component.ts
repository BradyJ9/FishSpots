import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MiniMapComponent } from '../../components/minimap/mini-map.component';
import { LocationService } from '../../services/location.service';
import { LocationDto } from '../../../model/dto/LocationDto';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AddOutingDialogComponent } from "../../components/add-outing-dialog/add-outing-dialog.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { OutingDto } from '../../../model/dto/OutingDto';
import { OutingFormData } from '../../../model/dto/OutingFormData';
import { ImageBlobService } from '../../services/imageblob.service';
import { BlobContainers } from '../../../model/enums/BlobContainers';
import { from } from 'rxjs';
import { LocationImageService } from '../../services/locationimage.service';
import { CatchDto } from '../../../model/dto/CatchDto';
import { CatchService } from '../../services/catch.service';

@Component({
  selector: 'app-add-location-page',
  imports: [FormsModule, MiniMapComponent, NavbarComponent,MatDialogModule],
  templateUrl: './add-location-page.component.html',
  styleUrl: './add-location-page.component.css'
})

export class AddLocationPageComponent {

  public newLat!: string;
  public newLng!: string;
  public locName: string = '';
  public locDesc: string = '';
  public locImage: File | null = null;

  private outingParams: {
    locationId:number,
    username: string,
    outingDate: Date;
    startTime: string;
    endTime: string;
    catches: CatchDto[];
    catchImages: (File | null)[];
    notes: string;
  } | undefined;

  constructor(private router:Router, private route: ActivatedRoute, 
    private locationService:LocationService, private dialog:MatDialog,
    private catchService:CatchService, private imageBlobService:ImageBlobService,
    private locationImageService: LocationImageService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.newLat = params["lat"];
      this.newLng = params["lng"];
    });
    this.updatePopup();
  }

  public nameIsValid():boolean {
    return this.locName.length <= 100;
  }

  public descriptionIsValid():boolean { 
    return this.locDesc.length <= 1000;
  }

  public imageValidSize():boolean {
    if(this.locImage != null)
      return this.locImage.size <= 8e+6; //8MB limit
    else
      return true;
  }

  public submissionIsValid():boolean {
    return !(!this.locName)
      && this.nameIsValid()
      && this.descriptionIsValid()
      && this.imageValidSize();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.locImage = input.files[0];
      console.log('Selected file:', this.locImage);
    } else {
      this.locImage = null;
    }
  }

  public insertLocationSubmit(): void {
    //TODO: Make this one request on the backend to support transactions...maybe as it is a little complex
    if (this.locImage) {
      from(this.imageBlobService.uploadFile(BlobContainers.LocationImages, this.locImage))
        .subscribe(imageUrl => {
          this.insertLocation(imageUrl);
        })
    } else {
      this.insertLocation(null);
    }
  }

  public insertLocation(imageUrl: string | null) {
    const newLocation:LocationDto = {
      locationName:this.locName,
      lat:this.newLat,
      long:this.newLng,
      locationDescription:this.locDesc
    }

    this.locationService.insertLocation(newLocation).subscribe({
      next: (locationId:number) => {
        if (this.outingParams){
          this.outingParams.locationId = locationId;
          this.insertOuting();
        }

        if (imageUrl) {
          this.locationImageService.insertImageUrl(locationId, imageUrl);
        }

        this.returnToHomepage(this.newLat, this.newLng);
      },
      error: (err) => {console.error('Error submitting location:', err);}
    });
  }

  public updatePopup(){
    (document.getElementById("locName") as HTMLInputElement).addEventListener("input", (e) => {
      const name = (e.target as HTMLInputElement).value;
      const popupEl = document.querySelector(".leaflet-popup") as HTMLElement;
      if (!popupEl) return;

      const nameSpan = popupEl.querySelector("#popupName");
      if (nameSpan) nameSpan.textContent = name;
    });

    (document.getElementById("locDesc") as HTMLInputElement).addEventListener("input", (e) => {
      const desc = (e.target as HTMLInputElement).value;
      const popupEl = document.querySelector(".leaflet-popup") as HTMLElement;
      if (!popupEl) return;

      const descSpan = popupEl.querySelector("#popupDescription");
      if (descSpan) descSpan.textContent = desc;
    });

    //NOTE: This preview does not adhere to the file size limit.
    (document.getElementById("locImage") as HTMLInputElement).addEventListener("change", (e) => {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const popupEl = document.querySelector(".leaflet-popup") as HTMLElement;
        if (!popupEl) return;

        const img = popupEl.querySelector("#popupImage") as HTMLImageElement;
        if (img) {
          img.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  public saveOutingSummary(data:OutingFormData){
    if(document.getElementById('outing-summary') == null){
      const form = document.getElementById('outing-info') as HTMLDivElement;
      const outingSummary = document.createElement("div");
      outingSummary.id = "outing-summary";

      console.log(data.date)
      
      outingSummary.innerHTML =
        `
          <h3>${formatDate(data.date,'mediumDate', 'en-US')}</h3>
          <h5>${data.startTime ? formatDate(data.startTime,'shortTime', 'en-US') : ''}-${data.endTime ? formatDate(data.endTime,'shortTime', 'en-US') : ''}</h5>
          <div><i class="fas fa-fish"></i> x${data.catches.length} </div>
          <p>${data.notes}</p>
        `;
      form.appendChild(outingSummary);
    } else {
      (document.getElementById('outing-summary') as HTMLDivElement).innerHTML =
      `
          <h3>${formatDate(data.date,'mediumDate', 'en-US')}</h3>
          <h5>${data.startTime ? formatDate(data.startTime,'shortTime', 'en-US') : ''}-${data.endTime ? formatDate(data.endTime,'shortTime', 'en-US') : ''}</h5>
          <div><i class="fas fa-fish"></i> x${data.catches.length} </div>
          <p>${data.notes}</p>
      `;
    }
    this.outingParams = {
      locationId:-1,
      username: data.username,
      outingDate: data.date,
      startTime: data.startTime ? formatDate(data.startTime,'mediumTime','en-US').slice(0,-3) : '',
      endTime: data.endTime ? formatDate(data.endTime,'mediumTime','en-US').slice(0,-3): '',
      notes: data.notes,
      catches: data.catches,
      catchImages: data.catchImages
    }
  }

  public addOutingOpenDialog() {
    const dialogRef = this.dialog.open(AddOutingDialogComponent, {
      width: '80vw',
      height: '90vh',
      maxWidth: 'none',
      disableClose: true,
      autoFocus: true       
    });
    dialogRef.afterClosed().subscribe((result: OutingFormData) => {
      if (result) {
        this.saveOutingSummary(result);
      }
    });
  }

  public async insertOuting(): Promise<void> {
    const newOuting:OutingDto = {
      locationId: this.outingParams!.locationId,
      username: this.outingParams!.username,
      outingDate: this.outingParams!.outingDate,
      startTime: this.outingParams!.startTime,
      endTime: this.outingParams!.endTime,
      notes: this.outingParams!.notes
    }

    await this.catchService.uploadCatchImagesAndAssignUrl(this.outingParams?.catchImages ?? [], this.outingParams?.catches ?? []);
    
    this.locationService.insertOutingByLocationId(newOuting.locationId, newOuting, this.outingParams?.catches ?? []).subscribe({
      next: () => {
        console.log('Outing inserted successfully');
      },
      error: (err) => {
        console.error('Error submitting outing:', err);
      }
    })
  }

  private returnToHomepage(lat:string, lng:string): void {
    this.router.navigate(['/'], { queryParams: { lat, lng } });
  }
}
