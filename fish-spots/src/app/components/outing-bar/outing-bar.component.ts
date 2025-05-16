import { Component, Input } from '@angular/core';
import { OutingDto } from '../../../model/dto/OutingDto';
import { CommonModule } from '@angular/common';
import { CatchDto } from '../../../model/dto/CatchDto';
import { OutingService } from '../../services/outing.service';
import { CatchService } from '../../services/catch.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'outing-bar',
  imports: [CommonModule],
  templateUrl: './outing-bar.component.html',
  styleUrl: './outing-bar.component.css'
})
export class OutingBarComponent {
  @Input() outing!: OutingDto
  catches$: Observable<CatchDto[]>

  constructor(private catchService: CatchService) {
    this.catches$ = this.catchService.getCatchesForOuting$(this.outing?.outingId ?? null)
  }

  public onDropdownClick() {
    
  }
}
