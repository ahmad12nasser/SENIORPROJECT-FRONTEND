import { GetPendingAppliedRequestsService } from '../../../services/client/controlRoom/getPendingAppliedRequests.service';
import { Component } from '@angular/core';
import { GetPendingHiredPostsService } from '../../../services/client/controlRoom/getPendingHiredPosts.service';
import { AcceptApplyRequestService } from '../../../services/client/controlRoom/acceptApplyRequest.service';
import { RejectApplyRequestService } from '../../../services/client/controlRoom/rejectApplyRequest.service';
import { LoginService } from '../../../services/authentication/login.service';
import { Post } from '../../../models/post';
import { request } from '../../../models/request';
import { CancelHireOnPostService } from '../../../services/posts/cancelHireOnPost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-room',
  templateUrl: './control-room.component.html',
  styleUrl: './control-room.component.css'
})
export class ControlRoomComponent {
  hiredPosts: any[] = [];
  appliedRequests: any[] = [];
  AppliedFreelancerProfileImageUrl: string = '';
  HiredFreelancerProfileImageUrl: string = '';
  constructor(
    private getPendingHiredPostsService: GetPendingHiredPostsService,
    private getPendingAppliedRequestsService: GetPendingAppliedRequestsService,
    private acceptApplyRequestService: AcceptApplyRequestService,
    private rejectApplyRequestService: RejectApplyRequestService,
    private loginService: LoginService,
    private cancelHireOnPostService: CancelHireOnPostService,
    private router: Router
  ) { }
  ngOnInit() {
    const client_id = this.loginService.getLoggedInUserId(); // Replace with the actual client id
    //fetching the Hired Posts that i was clicked on hire it
    if (client_id !== null) {
      this.getPendingHiredPostsService.getPendingHiredPosts(client_id).subscribe({
        next: (data) => {
          this.hiredPosts = data;
          this.prepareImages1();
        },
        error: (error) => {
        }
      });
    }

    //fetching the Applied Requests that's need my accept
    if (client_id !== null) {
      this.getPendingAppliedRequestsService.getPendingAppliedRequests(client_id).subscribe({
        next: (data) => {
          this.appliedRequests = data;
          this.prepareImages2();
        },
        error: (error) => {
        }
      });
    }
  }
  acceptRequest(appliedRequest_id: number) {
    this.acceptApplyRequestService.acceptApplyRequest(appliedRequest_id).subscribe({
      next: (data) => {
        alert('Successfully accepted applied request');
        this.ngOnInit();
      },
      error: (error) => {
        alert('Error accepting applied request');
      }
    });
  }

  rejectRequest(appliedRequest_id: number,request_id:number) {
    const formData = new FormData();
    formData.append("appliedRequest_id", appliedRequest_id.toString());
    formData.append("request_id", request_id.toString());

    this.rejectApplyRequestService.rejectApplyRequest(formData).subscribe({
      next: (data) => {
        alert('Successfully rejected applied request');
      },
      error: (error) => {
        alert('Error rejecting applied request');
      }
    });
  }
  prepareImages1() {
    for (const post of this.hiredPosts) {
      post.imageUrl = 'data:image/jpg;base64,' + post.image;
      post.freelancerImageUrl = 'data:image/jpg;base64,' + post.freelancerProfileImage;
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
        alert('Successfully cancelled hire');
        this.ngOnInit();
      },
      error: (error) => {
        alert('Error cancelling hire');
      }
    });
  }
  navigateToFreelancerProfile(freelancer_id:number, currentPath: string){
    this.router.navigate(['client/viewProfileFreelancer'],{
      queryParams: {
        freelancer_id: freelancer_id,
        backPath: currentPath
      }
    });
  }
}
