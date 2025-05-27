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

  constructor(private router:Router, private route: ActivatedRoute, 
    private locationService:LocationService, private dialog:MatDialog) { }

  //TODO: Don't return to homepage until the new marker is visible

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.newLat = params["lat"];
      this.newLng = params["lng"];
    });
    this.updatePopup();
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

  public addLocation(): void {
    //TODO: Implement image uploads
    //TODO: Submit outing info if present
    const newLocation:LocationDto = {
      locationName:this.locName,
      lat:this.newLat,
      long:this.newLng,
      locationDescription:this.locDesc
    }
    this.locationService.insertLocation(newLocation).subscribe({
      next: () => this.returnToHomepage(this.newLat, this.newLng),
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

  public saveOutingSummary(data:{ date: string, startTime: string, endTime:string, catchCount: number, notes: string }){
    if(document.getElementById('outing-summary') == null){
      const form = document.getElementById('outing-info') as HTMLDivElement;
      const outingSummary = document.createElement("div");
      outingSummary.className = "outing-summary";
      
      outingSummary.innerHTML =
        `
          <h3>${formatDate(data.date,'mediumDate', 'en-US')}</h3>
          <h5>${formatDate(data.date,'shortTime', 'en-US')}-${formatDate(data.date,'shortTime', 'en-US')}</h5>
          <div><i class="fas fa-fish"></i> x${data.catchCount} </div>
          <p>${data.notes}</p>
        `;
      form.appendChild(outingSummary);
    } else {
      (document.getElementById('outing-summary') as HTMLDivElement).innerHTML =
      `
        <h3>${data.date} ${data.startTime}-${data.endTime}</h3>
        <div><i class="fas fa-fish"></i> x${data.catchCount} </div>
        <p>${data.notes}</p>
      `;
    }
  }

  public addOutingOpenDialog() {
    const dialogRef = this.dialog.open(AddOutingDialogComponent, {
      width: '80vw',
      height: '90vh',
      maxWidth: 'none',
      disableClose: false,
      autoFocus: true       
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveOutingSummary(result);
      }
    });
  }

  private returnToHomepage(lat:string, lng:string): void {
    this.router.navigate(['/'], { queryParams: { lat, lng } });
  }
}
