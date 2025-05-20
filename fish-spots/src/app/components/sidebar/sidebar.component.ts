import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private catchService:CatchService, private imageService:CatchImageService){}

  //TODO: Sort catches by recent (if they aren't already)
  // ngOnInit(): void {
  //   this.catchService.getAllCatches().subscribe({
  //     next: (data) => {
  //       this.catches = data;

  //       this.catches.forEach((cat) => {
  //         this.imageService.getCatchImageById$(cat.catchId).subscribe({
  //           next: (data) => {
  //             console.log("balls");
  //             this.images.push(data);
  //           },
  //           error: (err) => {
  //             console.error('Error fetching images:', err);
  //           }
  //         })
  //       });

  //     },
  //     error: (err) => {
  //       console.error('Error fetching catches:', err);
  //     }
  //   }); 
  // }

  // public getImageUrl(catchId:number|undefined):string {
  //   console.log(catchId);
  //   for(let i=0; i<this.images.length; i++){
  //     if(this.images[i].catchId == catchId){
  //       console.log(this.images[i].storagePath)
  //       return this.images[i].storagePath;
  //     }
  //   }
  //   return "IMAGE NOT FOUND";
  // }

    ngOnInit(): void {
    this.catchService.getAllCatches().subscribe({
      next: (data: CatchDto[]) => {
        this.catches = data;

        this.catches.forEach((cat) => {
          if (cat.catchId !== undefined) {
            this.imageService.getCatchImageById$(cat.catchId).subscribe({
              next: (imageData) => {
                console.log(imageData);
                console.log(imageData.storagePath);
                this.imageMap[cat.catchId!] = imageData.storagePath
              },
              error: (err) => {
                console.error(`Error fetching image for catch ${cat.catchId}:`, err);
                this.imageMap[cat.catchId!] = '../../../assets/bigahhtrout.jpg'; // fallback
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
