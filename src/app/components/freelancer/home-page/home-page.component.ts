import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { request } from '../../../models/request';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  requests: any[] = [];

  constructor(private requestsService: RequestsService) { }

  ngOnInit() {
    // Fetch requests when the component initializes
    this.requestsService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
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
        // Optionally, you can refresh the requests list after applying
        this.refreshRequests();
      },
      error: (error) => {
        console.error('Error applying for the request:', error);
      }
    });
  }
  private refreshRequests() {
    this.requestsService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (error) => {
        console.error('Error refreshing requests:', error);
        return throwError('No request selected.'); // Use throwError here
      }
    });
  }
}
