import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/apiclient.service';
import { FormsModule } from '@angular/forms';
import { MiniMapComponent } from '../../components/minimap/mini-map.component';

@Component({
  selector: 'app-add-location-page',
  imports: [FormsModule, MiniMapComponent],
  templateUrl: './add-location-page.component.html',
  styleUrl: './add-location-page.component.css'
})
export class AddLocationPageComponent {

  public newLat!: string;
  public newLng!: string;
  public locName: string = '';
  public locDesc: string = '';
  public locImage: File | null = null;

  constructor(private router:Router, private route: ActivatedRoute, private apiClient:ApiClientService) { }

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
    const newLocation = {
      locationName:this.locName,
      lat:this.newLat,
      long:this.newLng,
      locationDescription:this.locDesc
    }
    this.apiClient.post<number>("location",newLocation).subscribe(); //'number' might not be right here, but I THINK the backend returns an int
    this.returnToHomepage();
  }

  public updatePopup(){
    (document.getElementById("locName") as HTMLInputElement).addEventListener("input", (e) => {
      const name = (e.target as HTMLInputElement).value;
      const popupEl = document.querySelector(".leaflet-popup") as HTMLElement;
      if (!popupEl) return;

      const nameSpan = popupEl.querySelector("#popupName");
      if (nameSpan) nameSpan.textContent = name;
    });

    // (document.getElementById("description") as HTMLInputElement).addEventListener("input", (e) => {
    //   const desc = (e.target as HTMLInputElement).value;
    //   const popupEl = document.querySelector(".leaflet-popup") as HTMLElement;
    //   if (!popupEl) return;

    //   const descSpan = popupEl.querySelector("#popupDescription");
    //   if (descSpan) descSpan.textContent = desc;
    // });
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

  private returnToHomepage(): void {
    this.router.navigate(['/']);
  }
}
