import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CatchDto } from '../../../model/dto/CatchDto';
import { map, Observable } from 'rxjs';
import { CatchService } from '../../services/catch.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  catches: CatchDto[] = [];

  displaySidebarUi: boolean = true;

  images = [
      { id:1, url: '../../../assets/logo.png'},
      { id:2, url: '../../../assets/location.png'}
  ];

  constructor(private catchService:CatchService, private activeRoute: ActivatedRoute){}

  //TODO: Sort catches by recent (if they aren't already)
  //We can do this through the backend SQL query
  ngOnInit(): void {
    this.catchService.getAllCatches().subscribe({
      next: (data) => {
        this.catches = data;
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
