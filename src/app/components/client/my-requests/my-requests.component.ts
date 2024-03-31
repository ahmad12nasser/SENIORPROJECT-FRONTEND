import { request } from '../../../models/request';
import { LoginService } from '../../../services/authentication/login.service';
import { GetMyRequestsService } from '../../../services/client/myRequests/getMyRequests.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrl: './my-requests.component.css'
})
export class MyRequestsComponent implements OnInit {

  requests: request[] = [];

  constructor(
    private getMyRequestsService: GetMyRequestsService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    const clientId = this.loginService.getLoggedInUserId() ?? 0;
    // Fetch requests when the component initializes
      this.getMyRequestsService.getMyRequests(clientId).subscribe({
        next: (data) => {
          this.requests = data;
          this.prepareImages();
          console.log('Successfully fetched requests:', true);
        },
        error: (error) => {
          console.error('Error fetching requests:', error);
        }
      });
  }
  prepareImages() {
    for (const request of this.requests) {
      request.imageUrl = `data:image/png;base64,`+ request.image;  // Construct data URL with PNG format
    }
  }
}
