import { Component, Input } from '@angular/core';
import { OutingDto } from '../../../model/dto/OutingDto';
import { CommonModule } from '@angular/common';
import { CatchDto } from '../../../model/dto/CatchDto';
import { OutingService } from '../../services/outing.service';
import { CatchService } from '../../services/catch.service';
import { map, Observable, of } from 'rxjs';
import { PhotoScrollerComponent } from "../photo-scroller/photo-scroller.component";

@Component({
  selector: 'outing-bar',
  imports: [CommonModule, PhotoScrollerComponent],
  templateUrl: './outing-bar.component.html',
  styleUrl: './outing-bar.component.css'
})
export class OutingBarComponent {
  @Input() outing!: OutingDto
  catches$!: Observable<CatchDto[]>
  isDropdownOpen: boolean = false;

  constructor(private catchService: CatchService) {
    
  }

  ngOnInit(): void {
    this.catches$ = this.catchService.getCatchesForOuting$(this.outing?.outingId ?? null)  
  }

  public getOutingImageUrls = (): Observable<string[]> => {
    return this.catches$.pipe(
      map(catches => catches
        .flatMap(c => c.imageUrl ?? [])
      )
    );
  }

  public onDropdownClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
