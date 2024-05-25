import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancerService } from '../../../services/users/freelancer.service';

@Component({
  selector: 'app-view-profile-freelancer',
  templateUrl: './view-profile-freelancer.component.html',
  styleUrl: './view-profile-freelancer.component.css'
})
export class ViewProfileFreelancerComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private freelancerService: FreelancerService
  ) { }


  freelancer: any = {};
  freelancerId: number = 0;
  backPath: string = '';
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.freelancerId = params['freelancer_id'];
      this.backPath = params['backPath'];
    })

    this.freelancerService.getFreelancerById(this.freelancerId).subscribe({
      next: (data) => {
        this.freelancer = data;
        this.prepareImage();
        console.log('Successfully fetched freelancer:', true);
      },
      error: (error) => {
        console.error('Error fetching freelancer:', error);
      }

    })
  }
  prepareImage() {
    for (const freelancer of this.freelancer) {
      freelancer.imageUrl = `data:image/jpg;base64,` + freelancer.profileImg;
    }
  }
  backToPage() {
    this.router.navigate([this.backPath]);
  }
}
