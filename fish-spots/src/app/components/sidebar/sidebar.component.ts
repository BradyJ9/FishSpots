import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CatchDto } from '../../../model/dto/CatchDto';
import { CatchService } from '../../services/catch.service';
import { CatchImageService } from '../../services/catchimage.service';
import { CatchImageDto } from '../../../model/dto/CatchImageDto';

@Component({
  selector: 'sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  catches: CatchDto[] = [];
  images$:CatchImageDto[] = [];
  imageMap: { [key: number]: string } = {};

  @Input() displaySidebarUi: boolean = false;

  constructor(private catchService:CatchService, private imageService:CatchImageService){}

    //TODO: Sort catches by recent (if they aren't already)
    //We can do this through the backend SQL query
    ngOnInit(): void {
    this.catchService.getAllCatches().subscribe({
      next: (data: CatchDto[]) => {
      this.catches = data;

      this.catches.forEach((cat, index) => {
        if (cat.catchId !== undefined) {
        this.imageService.getCatchImageById$(cat.catchId).subscribe({
          next: (imageData) => {
          this.imageMap[cat.catchId!] = imageData.storagePath;
          },
          error: (err) => {
          console.error(`Error fetching image for catch ${cat.catchId}:`, err);
          // Remove the catch from the list if it has no image
          this.catches.splice(index, 1);
          }
        });
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
}
