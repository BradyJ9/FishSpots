import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-scroller',
  imports: [CommonModule],
  templateUrl: './photo-scroller.component.html',
  styleUrl: './photo-scroller.component.css'
})

export class PhotoScrollerComponent {
    currentIndex = 0;
    imageUrls: string[] = [];

    @Input() viewHeight: string = '300px';
    @Input() viewWidth: string = '400px';
    @Input() arrowSize: string = '24px';
    @Input() fetchImageUrls$!: Observable<string[]>;

    ngOnInit(): void {
      
      this.fetchImageUrls$?.subscribe((urls: string[]) => {
        this.imageUrls = urls;
      })
      console.log(this.imageUrls.length);
    }

    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
    }

    nextImage() {
      console.log("next image: " + this.currentIndex);
      this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
    }
}  