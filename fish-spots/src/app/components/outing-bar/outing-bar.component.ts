import { Component, Input } from '@angular/core';
import { OutingDto } from '../../../model/dto/OutingDto';
import { CommonModule } from '@angular/common';
import { CatchDto } from '../../../model/dto/CatchDto';
import { CatchService } from '../../services/catch.service';
import { map, Observable, of, mergeMap, forkJoin } from 'rxjs';
import { PhotoScrollerComponent } from "../photo-scroller/photo-scroller.component";
import { TimeAmPmPipe } from '../../pipes/timeAmPm/time-am-pm.pipe';
import { ImageViewerComponent } from "../image-viewer/image-viewer.component";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'outing-bar',
  imports: [CommonModule, PhotoScrollerComponent, TimeAmPmPipe],
  templateUrl: './outing-bar.component.html',
  styleUrl: './outing-bar.component.css',
  // animations: [
  //   trigger('dropdownAnimation', [
  //     transition(':enter', [
  //       style({ height: 0, opacity: 0 }),
  //       animate('200ms ease', style({ height: '*', opacity: 1 }))
  //     ]),
  //     transition(':leave', [
  //       animate('150ms ease', style({ height: 0, opacity: 0 }))
  //     ])
  //   ])
  // ]
})
export class OutingBarComponent {
  @Input() outing!: OutingDto
  catches$!: Observable<CatchDto[]>
  isDropdownOpen: boolean = false;
  activeFishIndex: number = 0;

  constructor(private catchService: CatchService) {
    
  }

  ngOnInit(): void {
    this.catches$ = this.catchService.getCatchesForOuting$(this.outing?.outingId ?? null)  
  }

  public likeClicked = () => {

  }

  public getOutingImageUrls = (): Observable<string[]> => {
    return this.catches$.pipe(
      // Map catches to an array of observables, then combine them into one observable emitting an array of strings
      mergeMap(catches => {
        const imageObservables = catches
          .map(c => c.imageUrl ? this.catchService.downloadCatchImageFromSasUrl(c.imageUrl) : of(''))
        return imageObservables.length ? forkJoin(imageObservables) : of([]);
      })
    );
  }

  public currFishScroll = (newFishIndex : number) => {
    this.activeFishIndex = newFishIndex;
  }

  public onDropdownClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
