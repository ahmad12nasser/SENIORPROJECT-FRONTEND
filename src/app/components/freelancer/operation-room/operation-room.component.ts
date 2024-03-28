import { Component } from '@angular/core';
import { GetWaitingHiredPostsService } from '../../../services/freelancer/operationRoom/getWaitingHiredPosts.service';
import { GetWaitingAppliedRequestsService } from '../../../services/freelancer/operationRoom/getWaitingApplliedRequests.service';
import { ApproveHiredPostService } from '../../../services/freelancer/operationRoom/approveHiredPost.service';
import { DeclineHiredPostService } from '../../../services/freelancer/operationRoom/declineHiredPost.service';
import { LoginService } from '../../../services/authentication/login.service';

@Component({
  selector: 'app-operation-room',
  templateUrl: './operation-room.component.html',
  styleUrl: './operation-room.component.css'
})
export class OperationRoomComponent {
  hiredPosts: any[] = [];
  appliedRequests: any[] = [];
  constructor(
    private getWaitingHiredPostsService: GetWaitingHiredPostsService,
    private getWaitingAppliedRequestsService: GetWaitingAppliedRequestsService,
    private approveHiredPostService: ApproveHiredPostService,
    private declineHiredPostService: DeclineHiredPostService,
    private loginService: LoginService
  ) { }
  ngOnInit() {
    const freelancer_id = this.loginService.getLoggedInUserId() ?? 0; // Replace with the actual client id
    //fetching the Hired Posts that's need my accept
    this.getWaitingHiredPostsService.getWaitingHiredPosts(freelancer_id).subscribe({
      next: (data) => {
        this.hiredPosts = data;
        console.log('Successfully fetched hired posts:', true);
      },
      error: (error) => {
        console.error('Error fetching hired posts:', error);
      }
    });

    //fetching the Applied Requests that's need my accept
    this.getWaitingAppliedRequestsService.getWaitingAppliedRequests(freelancer_id).subscribe({
      next: (data) => {
        this.appliedRequests = data;
        console.log('Successfully fetched applied requests', true);
      },
      error: (error) => {
        console.error('Error fetcching applied requests', error);
      }
    });
  }
  acceptRequest(hiredPost_id: number) {
    this.approveHiredPostService.approveHiredPost(hiredPost_id).subscribe({
      next: (data) => {
        console.log('Successfully accepted applied request', true);
      },
      error: (error) => {
        console.error('Error accepting applied request', error);
      }
    });
  }

  rejectRequest(hiredPost_id: number) {
    this.declineHiredPostService.declineHiredPost(hiredPost_id).subscribe({
      next: (data) => {
        console.log('Successfully rejected applied request', true);
      },
      error: (error) => {
        console.error('Error rejecting applied request', error);
      }
    });
  }
}
