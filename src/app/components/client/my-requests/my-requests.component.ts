import { request } from '../../../models/request';
import { GetMyRequestsService } from '../../../services/client/myRequests/getMyRequests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent implements  OnInit{

  requests: request[] = [];

  constructor(private getMyRequestsService: GetMyRequestsService) { }

  ngOnInit() {
    //const clientId = this.getFreelancerIdFromLocalStorage();
    const clientId = 1;
    // Fetch requests when the component initializes
    this.getMyRequestsService.getMyRequests(clientId).subscribe({
      next: (data) => {
        this.requests = data;
               console.log('Successfully fetched requests:', true);
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
      }
      
    });
  }
  //this method ta 7atta es7ab el clientId mn el local session
  private getClientIdFromLocalSession(): number {
    return Number(localStorage.getItem('userId'));
  }
}
