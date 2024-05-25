import { first } from 'rxjs';
import { Component } from '@angular/core';
import { FreelancerInfoService } from '../../../services/freelancer/settings/freelancerInfo.service';
import { EditFreelancerInfoService } from '../../../services/freelancer/settings/editFreelancerInfo.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { LoginService } from '../../../services/authentication/login.service';
import { freelancer } from '../../../models/freelancer';
import { Locations } from '../../../models/locations';
import { ProfessionCategories } from '../../../models/profession_categ';

@Component({
  selector: 'app-freelancer-settings',
  templateUrl: './freelancer-settings.component.html',
  styleUrl: './freelancer-settings.component.css'
})
export class FreelancerSettingsComponent {
  locations = new Locations();
  categoryList = new ProfessionCategories();
  freelancer: any = {};
  editingFreelancer: any = {};
  editMode: boolean = false;
  changeImageMode: boolean = false;
  isAuthenticated: boolean | null = null;
  selectedFile: File | null = null;
  rating: number[] | null = null;
  comments: string[] | null = null;
  selectedLocation: string = '';
  selectedCategory:string = '';
  savedPicture: string = '';
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
    //this.getRatingWithComments(freelancer_id);
  }

  //function to get the info of a specific freelancer
  getFreelancerInfo(freelancer_id: number) {
    this.freelancerInfoService.getFreelancerInfo(freelancer_id).subscribe({
      next: (data) => {
        this.freelancer = data;
        this.prepareProfileImage();
      },
      error: (error) => {
      }
    });
  }

  //function to get the rating with comments of a specific freelancer
  getRatingWithComments(freelancer_id: number) {
    this.freelancerInfoService.getRatingWithComments(freelancer_id).subscribe({
      next: (data) => {
        this.form = data;
      },
      error: (error) => {
      }
    });
    this.rating = this.form.rating;
    this.comments = this.form.comments;
  }

  //function to calculate the average rating of a freelancer
  calculateAverageRating(ratings: number[]): number {
    if (ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    const average = sum / ratings.length;
    return Math.round(average * 10) / 10;
  }

  //function to enable edit mode for a specific freelancer
  editFreelancer(freelancer: any) {
    this.editingFreelancer = { ...freelancer };
    this.editMode = true;
    const profile = document.querySelector('.profile');
    if (profile) {
      profile.classList.add('d-none');
    }
  }

  //function to save the freelancer info
  saveFreelancer() {
    const formData = new FormData();
    if (this.selectedLocation === '') {
      this.selectedLocation = this.editingFreelancer.location;
    }
    if (this.selectedCategory === '') {
      this.selectedCategory = this.editingFreelancer.professionCategName;
    }
    formData.append('freelancer_id', this.editingFreelancer.id);
    formData.append('firstName', this.editingFreelancer.firstName);
    formData.append('lastName', this.editingFreelancer.lastName);
    formData.append('email', this.editingFreelancer.email);
    formData.append('mobile', this.editingFreelancer.mobile);
    formData.append('location', this.selectedLocation);
    formData.append('professionCateg', this.selectedCategory);
    formData.append('age', this.editingFreelancer.age);
    formData.append('description', this.editingFreelancer.description);
    this.editFreelancerInfoService.updateFreelancerInfo(formData).subscribe({
      next: (response) => {
        alert('Freelancer info updated successfully');
        this.editingFreelancer = {};
        this.editMode = false;
        const profile = document.querySelector('.profile');
        if (profile) {
          profile.classList.remove('d-none');
        }
        this.ngOnInit();
      },
      error: (error) => {
        alert('An error occurred while updating the freelancer info');
      }
    });
  }

  //function to change the image of the freelancer
  changeImage(freelancer_id: number) {
    const formData = new FormData();
    formData.append('freelancer_id', freelancer_id.toString());
    if (this.selectedFile) {
      formData.append('changedImage', this.selectedFile);
    }
    this.editFreelancerInfoService.updateFreelancerImage(formData).subscribe({
      next: (response) => {
        alert('Freelancer image updated successfully');
        this.editingFreelancer = {};
        this.changeImageMode = false;
        this.ngOnInit();
      },
      error: (error) => {
        alert('An error occurred while updating the freelancer image');
      }
    });
  }

  //function to prepare the image of the freelancer
  prepareProfileImage() {
    for (const freelancer of this.freelancer) {
      freelancer.imageUrl = 'data:image/jpg;base64,'+ freelancer.profileImg;
    }
  }

  //function to handle the file change event
  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  //function to cancel the edit mode
  cancelEdit() {
    this.editingFreelancer = {};
    this.editMode = false;
    const profile = document.querySelector('.profile');
    if (profile) {
      profile.classList.remove('d-none');
    }
  }

  //function to logout
  logout() {
    this.authService.logout();
    this.loginService.logout();
  }
}
