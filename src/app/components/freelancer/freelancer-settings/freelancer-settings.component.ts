import { Component } from '@angular/core';
import { FreelancerInfoService } from '../../../services/freelancer/settings/freelancerInfo.service';
import { EditFreelancerInfoService } from '../../../services/freelancer/settings/editFreelancerInfo.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { LoginService } from '../../../services/authentication/login.service';
import { freelancer } from '../../../models/freelancer';

@Component({
  selector: 'app-freelancer-settings',
  templateUrl: './freelancer-settings.component.html',
  styleUrl: './freelancer-settings.component.css'
})
export class FreelancerSettingsComponent {
  freelancer: freelancer[] = [];
  editingFreelancer: any = {};
  editMode: boolean = false;
  changeImageMode: boolean = false;
  isAuthenticated: boolean | null = null;
  imageUrl: string = '';
  selectedFile: File | null = null;
  rating: number[] | null = null;
  comments: string[] | null = null;
  form: any = {};
  constructor(
    private freelancerInfoService: FreelancerInfoService,
    private editFreelancerInfoService: EditFreelancerInfoService,
    private authService: AuthService,
    private loginService: LoginService
  ) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnInit() {
    const freelancer_id = this.loginService.getLoggedInUserId() ?? 0;
    this.getFreelancerInfo(freelancer_id);
    this.getRatingWithComments(freelancer_id);
  }

  getFreelancerInfo(freelancer_id: number) {
    this.freelancerInfoService.getFreelancerInfo(freelancer_id).subscribe({
      next: (data) => {
        this.freelancer = data;
        console.log('Successfully fetched freelancer info:', data);
      },
      error: (error) => {
        console.error('Error fetching freelancer info:', error);
      }
    });
  }
  getRatingWithComments(freelancer_id: number) {
    this.freelancerInfoService.getRatingWithComments(freelancer_id).subscribe({
      next: (data) => {
        this.form = data;
        console.log('Successfully fetched rating with comments:', data);
      },
      error: (error) => {
        console.error('Error fetching rating with comments:', error);
      }
    });
    this.rating = this.form.rating;
    this.comments = this.form.comments;
  }
  calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) {
      return 0; // Return 0 if there are no ratings
    }

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;

    // Round the average to one decimal point
    return Math.round(average * 10) / 10;
  }

  editFreelancer(freelancer: any) {
    this.editingFreelancer = { ...freelancer };
    this.editMode = true;
  }

  changeImageModeOn(freelancer: any) {
    this.editingFreelancer = { ...freelancer };
    this.changeImageMode = true;
  }

  saveFreelancer() {
    const formData = new FormData();

    formData.append('freelancer_id', this.editingFreelancer.id);
    formData.append('firstName', this.editingFreelancer.firstName);
    formData.append('lastName', this.editingFreelancer.lastName);
    formData.append('email', this.editingFreelancer.email);
    formData.append('mobile', this.editingFreelancer.mobile);
    formData.append('location', this.editingFreelancer.location);
    formData.append('professionCateg', this.editingFreelancer.professionCategName);
    formData.append('age', this.editingFreelancer.age);
    formData.append('description', this.editingFreelancer.description);

    this.editFreelancerInfoService.updateFreelancerInfo(formData).subscribe({
      next: (response) => {
        console.log('Freelancer info updated successfully:', response);
        this.prepareProfilePicture();
        this.editingFreelancer = {};
        this.editMode = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating freelancer info:', error);
      }
    });
  }

  changeImage() {
    const formData = new FormData();
    formData.append('freelancer_id', this.editingFreelancer.id);
    if (this.selectedFile) {
      formData.append('changedImage', this.selectedFile);
    }
    this.editFreelancerInfoService.updateFreelancerImage(formData).subscribe({
      next: (response) => {
        console.log('Freelancer image updated successfully:', response);
        this.prepareProfilePicture();
        this.editingFreelancer = {};
        this.changeImageMode = false;
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating freelancer image:', error);
      }
    });
  }
  prepareProfilePicture() {
    for (const freelancer of this.freelancer) {
      freelancer.imageUrl = `data:image/png;base64,` + freelancer.profileImg;
    }
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  cancelEdit() {
    this.editingFreelancer = {};
    this.editMode = false;
  }
  cancelChangeImage() {
    this.editingFreelancer = {};
    this.changeImageMode = false;
  }
  logout() {
    this.authService.logout();
    this.loginService.logout();
  }
}
