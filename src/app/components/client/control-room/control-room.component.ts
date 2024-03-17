import { GetPendingAppliedRequestsService } from './../../../services/client/getPendingAppliedRequests.service';
import { Component } from '@angular/core';
import { GetPendingHiredPostsService } from '../../../services/client/getPendingHiredPosts.service';
import { AcceptApplyRequestService } from '../../../services/client/acceptApplyRequest.service';
import { RejectApplyRequestService } from '../../../services/client/rejectApplyRequest.service';

@Component({
  selector: 'app-control-room',
  templateUrl: './control-room.component.html',
  styleUrl: './control-room.component.css'
})
export class ControlRoomComponent {
  hiredPosts: any[] = [];
  appliedRequests: any[] = [];
  constructor(
    private getPendingHiredPostsService: GetPendingHiredPostsService,
    private getPendingAppliedRequestsService: GetPendingAppliedRequestsService,
    private acceptApplyRequestService: AcceptApplyRequestService,
    private rejectApplyRequestService: RejectApplyRequestService
  ) { }
  ngOnInit() {
    //const client_id = localStorage.getItem('user_id');
    const client_id = 1; // Replace with the actual client id
    //fetching the Hired Posts that i was clicked on hire it
    this.getPendingHiredPostsService.getPendingHiredPosts(client_id).subscribe({
      next: (data) => {
        this.hiredPosts = data;
        console.log('Successfully fetched hired posts:', true);
      },
      error: (error) => {
        console.error('Error fetching hired posts:', error);
      }
    });

    //fetching the Applied Requests that's need my accept
    this.getPendingAppliedRequestsService.getPendingAppliedRequests(client_id).subscribe({
      next: (data) => {
        this.appliedRequests = data;
        console.log('Successfully fetched applied requests', true);
      },
      error: (error) => {
        console.error('Error fetcching applied requests', error);
      }
    });
  }
  acceptRequest(appliedRequest_id: number){
    this.acceptApplyRequestService.acceptApplyRequest(appliedRequest_id).subscribe({
      next: (data) => {
        console.log('Successfully accepted applied request', true);
      },
      error: (error) => {
        console.error('Error accepting applied request', error);
      }
    });
  }
  
  rejectRequest(appliedRequest_id: number){
    this.rejectApplyRequestService.rejectApplyRequest(appliedRequest_id).subscribe({
      next: (data) => {
        console.log('Successfully rejected applied request', true);
      },
      error: (error) => {
        console.error('Error rejecting applied request', error);
      }
    });
  }
}
