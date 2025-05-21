import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CatchDto } from '../../../model/dto/CatchDto';
import { CatchService } from '../../services/catch.service';

@Component({
  selector: 'sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  catches: CatchDto[] = [];
  imageMap: { [key: number]: string } = {};

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

  public getFormattedDate(dateInput: Date | string | null | undefined): string {
    if (!dateInput) return 'Invalid date';

    const date = new Date(dateInput);

    if (isNaN(date.getTime())) return 'Invalid date';

    return new Intl.DateTimeFormat('en-US').format(date);
  }

  likeClicked(numLikes:number, id:number): void {
    const likeButton = document.getElementById("like-button"+id.toString()) as HTMLImageElement;
    const likesCount = document.getElementById("likes-count"+id.toString()) as HTMLDivElement;
    
    if(likeButton.name == "unclicked"){
      likeButton.src = "/../../../assets/hearticon-red.png";
      likesCount.textContent = (numLikes+1) + " likes";
      this.catchService.incrementLikes(id);
      likeButton.name = "clicked";
    }
    
    else if(likeButton.name == "clicked"){
      likeButton.src = "../../../assets/hearticon.png";
      likesCount.textContent = (numLikes) + " likes";
      this.catchService.decrementLikes(id);
      likeButton.name = "unclicked";
    }
  }
}
