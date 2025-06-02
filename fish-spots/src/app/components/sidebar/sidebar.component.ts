import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CatchDto } from '../../../model/dto/CatchDto';
import { CatchService } from '../../services/catch.service';
import { LocationDto } from '../../../model/dto/LocationDto';
import { Observable } from 'rxjs';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'sidebar',
  imports: [CommonModule,ImageViewerComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  catches: CatchDto[] = [];
  imageMap: { [key: number]: string } = {};
  $catchLocations = new Map<number,Observable<LocationDto>>();

  @Input() displaySidebarUi: boolean = false;

  constructor(private catchService:CatchService){}

    //TODO: Sort catches by recent (if they aren't already)
    //We can do this through the backend SQL query
    ngOnInit(): void {
    this.catchService.getAllCatches().subscribe({
      next: (data: CatchDto[]) => {
        this.catches = data;

        this.catches.forEach((cat, index) => {
          if (!cat.imageUrl) {
            this.catches.splice(index, 1);
          }
          if (cat.catchId !== undefined) {
            this.imageMap[cat.catchId!] = cat.imageUrl;
            this.$catchLocations.set(cat.catchId,this.catchService.getCatchLocation(cat.catchId));
          }
        });
      },
      error: (err) => {
        console.error('Error fetching catches:', err);
      }
    });
  }

  public toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  public likeClicked(cat:CatchDto): void {
    const likeButton = document.getElementById("like-button"+cat.catchId!.toString()) as HTMLImageElement;
    const likesCount = document.getElementById("likes-count"+cat.catchId!.toString()) as HTMLDivElement;
    
    if(likeButton.name == "unclicked"){
      likeButton.src = "/../../../assets/hearticon-red.png";
      likesCount.textContent = (cat.likes+1) + " likes";
      //Should we make an incrementLikes function in catchService instead of this?
      const updatedCatch:CatchDto = {
        catchId: cat.catchId,
        outingId: cat.outingId,
        species: cat.species,
        catchLength: cat.catchLength,
        catchWeight: cat.catchWeight,
        likes: cat.likes+1,
        imageUrl: cat.imageUrl,
        createdAt: cat.createdAt,
        lastUpdatedAt: cat.lastUpdatedAt
      }
      this.catchService.updateCatch(updatedCatch);
      likeButton.name = "clicked";
    }
    
    // V2 FIXME: This part is scuffed.
    // If the sidebar is re-rendering dynamically (idk if we'll ever do this)
    // OR
    // if the post has already been liked (probably a v2 feature),
    // this implementation should be changed.
    else if(likeButton.name == "clicked"){
      likeButton.src = "../../../assets/hearticon.png";
      likesCount.textContent = cat.likes + " likes";
      this.catchService.updateCatch(cat);
      likeButton.name = "unclicked";
    }
  }

  public showFullImage(src:string):void{
    const fullImage = document.createElement("img");
    fullImage.src = src;
    console.log("click");
    document.appendChild(fullImage);
  }
}
