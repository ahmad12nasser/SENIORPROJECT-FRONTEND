import { Component } from '@angular/core';
import { GetWaitingHiredPostsService } from '../../../services/freelancer/operationRoom/getWaitingHiredPosts.service';
import { GetWaitingAppliedRequestsService } from '../../../services/freelancer/operationRoom/getWaitingApplliedRequests.service';
import { ApproveHiredPostService } from '../../../services/freelancer/operationRoom/approveHiredPost.service';
import { DeclineHiredPostService } from '../../../services/freelancer/operationRoom/declineHiredPost.service';
import { LoginService } from '../../../services/authentication/login.service';
import { request } from '../../../models/request';
import { Post } from '../../../models/post';
import { CancelApplyOnRequestService } from '../../../services/requests/cancelApplyOnRequest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operation-room',
  templateUrl: './operation-room.component.html',
  styleUrl: './operation-room.component.css'
})
export class OperationRoomComponent {
  hiredPosts:any = [];
  appliedRequests: any[] = [];
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
    private router: Router
  ) { }
  ngOnInit() {
    const freelancer_id = this.loginService.getLoggedInUserId() ?? 0; // Replace with the actual client id
    //fetching the Hired Posts that's need my accept
    this.getWaitingHiredPostsService.getWaitingHiredPosts(freelancer_id).subscribe({
      next: (data) => {
        this.hiredPosts = data;
        this.prepareHiredPostsImages();
      },
      error: (error) => {
      }
    });

    //fetching the Applied Requests that's need my accept
    this.getWaitingAppliedRequestsService.getWaitingAppliedRequests(freelancer_id).subscribe({
      next: (data) => {
        this.appliedRequests = data;
        this.preparedAppliedRequestsImages();
      },
      error: (error) => {
      }
    });
  }
  acceptRequest(hiredPost_id: number) {
    this.approveHiredPostService.approveHiredPost(hiredPost_id).subscribe({
      next: (data) => {
        alert('Successfully accepted applied request');
        window.location.reload();
      },
      error: (error) => {
        alert('Error accepting applied request');
      }
    });
  }

  rejectRequest(hiredPost_id: number) {
    this.declineHiredPostService.declineHiredPost(hiredPost_id).subscribe({
      next: (data) => {
        alert('Successfully rejected applied request');
        window.location.reload();

      },
      error: (error) => {
        alert('Error rejecting applied request');
      }
    });
  }

  cancelRequest(appliedRequest_id: number,request_id:number){
    this.cancelApplyOnRequestService.cancelApplyOnRequest(request_id,appliedRequest_id).subscribe({
      next: (data) => {
        alert('Successfully canceled applied request');
        this.ngOnInit();
      },
      error: (error) => {
        alert('Error canceling applied request');
      }
    });
  }
  prepareHiredPostsImages() {
    for (const post of this.hiredPosts) {
      post.imageUrl = 'data:image/jpeg;base64,' + post.image;
      post.clientImageUrl = 'data:image/jpeg;base64,' + post.clientProfileImage;
    }
  }
  preparedAppliedRequestsImages() {
    for (const request of this.appliedRequests) {
      request.imageUrl = 'data:image/jpeg;base64,' + request.image;
      request.clientImageUrl = 'data:image/jpeg;base64,' + request.clientProfileImage;
    }
  }
  navigateToClientProfile(client_id: number, currentPath: string) {
    this.router.navigate(['freelancer/viewProfileClient'],{
      queryParams: {
        client_id: client_id,
        backPath: currentPath
      }
    })
  }
}
