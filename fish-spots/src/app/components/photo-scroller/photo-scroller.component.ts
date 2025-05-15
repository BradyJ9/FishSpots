import { Component } from '@angular/core';

@Component({
  selector: 'app-photo-scroller',
  imports: [],
  templateUrl: './photo-scroller.component.html',
  styleUrl: './photo-scroller.component.css'
})

export class PhotoScrollerComponent {
    currentIndex = 0;
    images: string[] = [];

    ngOnInit(): void {
      this.images = [
        // 'assets/location.png',
        // 'assets/logo.png'
      ];
      //console.log(this.images.length);
    }
  
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  
    nextImage() {
      console.log("next image: " + this.currentIndex);
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
}  
