import { GetPendingAppliedRequestsService } from '../../../services/client/controlRoom/getPendingAppliedRequests.service';
import { Component } from '@angular/core';
import { GetPendingHiredPostsService } from '../../../services/client/controlRoom/getPendingHiredPosts.service';
import { AcceptApplyRequestService } from '../../../services/client/controlRoom/acceptApplyRequest.service';
import { RejectApplyRequestService } from '../../../services/client/controlRoom/rejectApplyRequest.service';
import { LoginService } from '../../../services/authentication/login.service';
import { Post } from '../../../models/post';
import { request } from '../../../models/request';
import { CancelHireOnPostService } from '../../../services/posts/cancelHireOnPost.service';

@Component({
  selector: 'app-control-room',
  templateUrl: './control-room.component.html',
  styleUrl: './control-room.component.css'
})
export class ControlRoomComponent {
  hiredPosts: Post[] = [];
  appliedRequests: request[] = [];
  AppliedFreelancerProfileImageUrl: string = '';
  HiredFreelancerProfileImageUrl: string = '';
  constructor(
    private getPendingHiredPostsService: GetPendingHiredPostsService,
    private getPendingAppliedRequestsService: GetPendingAppliedRequestsService,
    private acceptApplyRequestService: AcceptApplyRequestService,
    private rejectApplyRequestService: RejectApplyRequestService,
    private loginService: LoginService,
    private cancelHireOnPostService: CancelHireOnPostService
  ) { }
  ngOnInit() {
    const client_id = this.loginService.getLoggedInUserId(); // Replace with the actual client id
    //fetching the Hired Posts that i was clicked on hire it
    if (client_id !== null) {
      this.getPendingHiredPostsService.getPendingHiredPosts(client_id).subscribe({
        next: (data) => {
          this.hiredPosts = data;
          this.prepareImages1();
          console.log('Successfully fetched hired posts:', true);
        },
        error: (error) => {
          console.error('Error fetching hired posts:', error);
        }
      });
    }

    //fetching the Applied Requests that's need my accept
    if (client_id !== null) {
      this.getPendingAppliedRequestsService.getPendingAppliedRequests(client_id).subscribe({
        next: (data) => {
          this.appliedRequests = data;
          this.prepareImages2();
          console.log('Successfully fetched applied requests', true);
        },
        error: (error) => {
          console.error('Error fetcching applied requests', error);
        }
      });
    }
  }
  acceptRequest(appliedRequest_id: number) {
    this.acceptApplyRequestService.acceptApplyRequest(appliedRequest_id).subscribe({
      next: (data) => {
        console.log('Successfully accepted applied request', true);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error accepting applied request', error);
      }
    });
  }

  rejectRequest(appliedRequest_id: number) {
    this.rejectApplyRequestService.rejectApplyRequest(appliedRequest_id).subscribe({
      next: (data) => {
        console.log('Successfully rejected applied request', true);
      },
      error: (error) => {
        console.error('Error rejecting applied request', error);
      }
    });
  }
  prepareImages1() {
    for (const post of this.hiredPosts) {
      post.imageUrl = 'data:image/jpg;base64,' + post.image;
      post.freelancerImageUrl = 'data:image/jpg;base64,' + post.freelancerProfileImge;
    }
  }
  prepareImages2() {
    for (const request of this.appliedRequests) {
      request.imageUrl = 'data:image/jpg;base64,' + request.image;
      request.freelancerImageUrl = 'data:image/jpg;base64,' + request.freelancerProfileImage;
    }
  }

  cancelHire(hiredPost_id:number,post_id:number){
    this.cancelHireOnPostService.cancelHireOnPost(post_id,hiredPost_id).subscribe({
      next: (data) => {
        console.log('Successfully cancelled hire', true);
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Error cancelling hire', error);
      }
    });
  }
}
