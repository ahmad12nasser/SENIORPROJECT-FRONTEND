import { request } from './../../../models/request';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  requests: request[] = [];
  imageUrl: string = '';
  clientImageUrl: string = '';
  
  constructor(
    private requestsService: RequestsService,
    private router: Router
    ){ }

  ngOnInit() {
    // Fetch requests when the component initializes
    this.requestsService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.preparImages();
        console.log('Successfully fetched requests:', true);
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
      }
    });
  }

  applyForRequest(requestId: number, clientId: number) {
    // Call the service method to apply for the request
    this.requestsService.applyForRequest(requestId, clientId).subscribe({
      next: (response) => {
        console.log('Successfully applied for the request:', response);
        this.router.navigate(['http://localhost:4200/freelancer/operationRoom']);
      },
      error: (error) => {
        console.error('Error applying for the request:', error);
      }
    });
  }
  preparImages(){
    for (const request of this.requests) {
      request.imageUrl =`data:image/png;base64,`+ request.image;  // Construct data URL with PNG format
      request.clientImageUrl = `data:image/png;base64,`+ request.clientProfileImage;  // Construct data URL with PNG format
    }
  }
}
