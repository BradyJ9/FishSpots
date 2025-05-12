import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class SidebarComponent {
  constructor(private apiClient:ApiClientService){}
  isSidebarOpen = false;

  //TODO: Retrieve catches data from backend & SORT BY RECENT
  public getCatches():Observable<CatchDto[]>{
    let catchesObs:Observable<CatchDto[]> = this.apiClient.get<{ catches: CatchDto[] }>("catch").pipe(
      map(response => response.catches)  // Extract 'locations' array from nested reponse
    );
    return catchesObs;
  }

  catches:CatchDto[] = [
    {
      id:1,
      outingId:1,
      species: "Sea Bass",
      catchLength: 57.6,
      catchWeight: 15.9,
      likes:10,
      createdAt:new Date(),
      updatedAt: new Date()
    },
    {
      id:1,
      outingId:1,
      species: "Catfish",
      catchLength: 57.6,
      catchWeight: 15.9,
      likes:10,
      createdAt:new Date(),
      updatedAt: new Date()
    },
        {
      id:1,
      outingId:1,
      species: "Sea Bass",
      catchLength: 57.6,
      catchWeight: 15.9,
      likes:10,
      createdAt:new Date(),
      updatedAt: new Date()
    },
    {
      id:1,
      outingId:1,
      species: "Catfish",
      catchLength: 57.6,
      catchWeight: 15.9,
      likes:10,
      createdAt:new Date(),
      updatedAt: new Date()
    }
  ];

  images = [
    { id:1, url: '../../../assets/logo.png'},
    { id:2, url: '../../../assets/location.png'}
  ];

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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getFormattedDate(date:Date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }
}
