import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/apiclient.service';
import { CatchDto } from '../../../model/dto/CatchDto';
import { OutingDto } from '../../../model/dto/OutingDto';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  catches: CatchDto[] = [];

  images = [
      { id:1, url: '../../../assets/logo.png'},
      { id:2, url: '../../../assets/location.png'}
  ];

  constructor(private apiClient:ApiClientService){}

  ngOnInit(): void {
    this.getAllCatches().subscribe({
      next: (data) => {
        this.catches = data;
      },
      error: (err) => {
        console.error('Error fetching catches:', err);
      }
    });
  }

  //TODO: SORT BY RECENT
  private getAllCatches():Observable<CatchDto[]> {
    let catchesObs:Observable<CatchDto[]> = this.apiClient.get<{ catches: CatchDto[] }>("catch").pipe(
      map(response => response.catches)
    );
    return catchesObs;
  }

  // outings:OutingDto[] = [
  //   {
  //     // readonly id: number;
  //     // readonly locId: number;
  //     // readonly date: Date;
  //     // readonly startTime: Date;
  //     // readonly endTime: Date;
  //     // readonly createdAt: Date;
  //     // readonly updatedAt: Date;
  //   },
  //   {
  //     // readonly id: number;
  //     // readonly locId: number;
  //     // readonly date: Date;
  //     // readonly startTime: Date;
  //     // readonly endTime: Date;
  //     // readonly createdAt: Date;
  //     // readonly updatedAt: Date;
  //   }
  // ]

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
