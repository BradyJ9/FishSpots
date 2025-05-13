import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/apiclient.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-location-page',
  imports: [FormsModule],
  templateUrl: './add-location-page.component.html',
  styleUrl: './add-location-page.component.css'
})
export class AddLocationPageComponent {

  public newLat!: string;
  public newLng!: string;
  public locName: string = '';
  public locDesc: string = '';

  constructor(private router:Router, private route: ActivatedRoute, private apiClient:ApiClientService) { }

  //TODO: Don't return to homepage until the new marker is visible

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.newLat = params["lat"];
      this.newLng = params["lng"];
    });
  }

  public addLocation(): void {
    const newLocation = {
      locationName:this.locName,
      lat:this.newLat,
      long:this.newLng,
      locationDescription:this.locDesc
    }
    this.apiClient.post<number>("location",newLocation).subscribe(); //'number' might not be right here, but I THINK the backend returns an int
    this.returnToHomepage();
  }

  private returnToHomepage(): void {
    this.router.navigate(['/']);
  }
}
