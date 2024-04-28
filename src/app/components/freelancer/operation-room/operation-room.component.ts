import { Component } from '@angular/core';
import { GetWaitingHiredPostsService } from '../../../services/freelancer/operationRoom/getWaitingHiredPosts.service';
import { GetWaitingAppliedRequestsService } from '../../../services/freelancer/operationRoom/getWaitingApplliedRequests.service';
import { ApproveHiredPostService } from '../../../services/freelancer/operationRoom/approveHiredPost.service';
import { DeclineHiredPostService } from '../../../services/freelancer/operationRoom/declineHiredPost.service';
import { LoginService } from '../../../services/authentication/login.service';
import { request } from '../../../models/request';
import { Post } from '../../../models/post';
import { CancelApplyOnRequestService } from '../../../services/requests/cancelApplyOnRequest.service';

@Component({
  selector: 'app-operation-room',
  templateUrl: './operation-room.component.html',
  styleUrl: './operation-room.component.css'
})
export class OperationRoomComponent {
  hiredPosts: Post[] = [];
  appliedRequests: request[] = [];
  appliedRequestImageUrl: string = '';
  hiredPostImageUrl: string = '';
  appliedClientPorfileImageUrl: string = '';
  hiredClientProfileImageUrl: string = '';
  constructor(
    private getWaitingHiredPostsService: GetWaitingHiredPostsService,
    private getWaitingAppliedRequestsService: GetWaitingAppliedRequestsService,
    private approveHiredPostService: ApproveHiredPostService,
    private declineHiredPostService: DeclineHiredPostService,
    private loginService: LoginService,
    private cancelApplyOnRequestService: CancelApplyOnRequestService,
  ) { }
  ngOnInit() {
    const freelancer_id = this.loginService.getLoggedInUserId() ?? 0; // Replace with the actual client id
    //fetching the Hired Posts that's need my accept
    this.getWaitingHiredPostsService.getWaitingHiredPosts(freelancer_id).subscribe({
      next: (data) => {
        this.hiredPosts = data;
        this.prepareHiredPostsImages();
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
        this.preparedAppliedRequestsImages();
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
        window.location.reload();
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
        window.location.reload();

      },
      error: (error) => {
        console.error('Error rejecting applied request', error);
      }
    });
  }

  cancelRequest(appliedRequest_id: number,request_id:number){
    this.cancelApplyOnRequestService.cancelApplyOnRequest(request_id,appliedRequest_id).subscribe({
      next: (data) => {
        console.log('Successfully canceled applied request', true);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error canceling applied request', error);
      }
    });
  }
  prepareHiredPostsImages() {
    for (const post of this.hiredPosts) {
      post.imageUrl = 'data:image/jpeg;base64,' + post.image;
      post.clientImageUrl = 'data:image/jpeg;base64,' + post.clientProfileImge;
    }
  }
  preparedAppliedRequestsImages() {
    for (const request of this.appliedRequests) {
      request.imageUrl = 'data:image/jpeg;base64,' + request.image;
      request.clientImageUrl = 'data:image/jpeg;base64,' + request.clientProfileImage;
    }
  }
}
