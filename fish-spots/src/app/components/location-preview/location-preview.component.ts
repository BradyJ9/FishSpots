import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'location-preview',
  imports: [],
  templateUrl: './location-preview.component.html',
  styleUrl: './location-preview.component.css'
})
export class LocationPreviewComponent {
  @Input() imageUrl!: string;
  @Input() locationId!: number;
  @Input() locationName!: string;
  @Input() locationDescription!: string;

  constructor(private router: Router) {}

  goToLocationPage() {
    if (this.locationId) {
      this.router.navigate([`/location/${this.locationId}`]);
    } else {
      console.error("LocationId is undefined.");
    }
  }
}
