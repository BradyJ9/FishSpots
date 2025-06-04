import { Component } from '@angular/core';

@Component({
  selector: 'image-viewer',
  imports: [],
  templateUrl: './image-viewer.component.html',
  styleUrl: './image-viewer.component.css'
})
export class ImageViewerComponent {

  closeModal():void {
    var modal = document.getElementById("imageModal");
    if(modal != null)
      modal.style.display = "none";
    else
      console.log("modal not found");
  }
}
