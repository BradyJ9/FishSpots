import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageViewerComponent } from "../image-viewer/image-viewer.component";

@Component({
  selector: 'app-photo-scroller',
  imports: [CommonModule, ImageViewerComponent],
  templateUrl: './photo-scroller.component.html',
  styleUrl: './photo-scroller.component.css'
})

export class PhotoScrollerComponent {
    @Output() currentIndexChange = new EventEmitter<number>();
    currentIndex: number = 0;
    imageUrls: string[] = [];
    isNextHovered: boolean = false;
    isPrevHovered: boolean = false;

    @Input() viewHeight: string = '400px';
    @Input() viewWidth: string = '500px';
    @Input() arrowSize: string = '24px';
    @Input() fetchImageUrls$!: Observable<string[]>;

    ngOnInit(): void {
      this.fetchImageUrls$.subscribe((urls: string[]) => {
        this.imageUrls = urls;
      })
    }

    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
      this.currentIndexChange.emit(this.currentIndex);
    }

    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
      this.currentIndexChange.emit(this.currentIndex);
    }

    public showFullImage(src:string):void{
      if(src){
        var modal = document.getElementById("imageModal");
        if(modal != null){
          modal.style.display = "flex";
          var image:HTMLImageElement = (document.getElementById("fullscreen-image") as HTMLImageElement);
          image.src = src;
        } else {
          console.error('Image modal does not exist.');
        }
      }
    }
}  