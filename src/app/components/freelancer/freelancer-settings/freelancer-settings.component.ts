import { Component } from '@angular/core';
import { FreelancerInfoService } from '../../../services/freelancer/settings/freelancerInfo.service';
import { EditFreelancerInfoService } from '../../../services/freelancer/settings/editFreelancerInfo.service';
import { AuthService } from '../../../services/authentication/auth.service';
import { LoginService } from '../../../services/authentication/login.service';

@Component({
  selector: 'app-freelancer-settings',
  templateUrl: './freelancer-settings.component.html',
  styleUrl: './freelancer-settings.component.css'
})
export class FreelancerSettingsComponent {
  freelancer: any[] = [];
  editingFreelancer: any = {};
  editMode: boolean = false;
  isAuthenticated: boolean | null = null;
  imageUrl: string = '';
  selectedFile: File | null = null;
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

  editFreelancer(freelancer: any) {
    this.editingFreelancer = { ...freelancer };
    this.editMode = true;
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
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
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

  prepareProfilePicture() {
    for (const freelancer of this.freelancer) {
      this.imageUrl = `data:image/png;base64,` + freelancer.profile_image;
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
  logout() {
    this.authService.logout();
    this.loginService.logout();
  }
}
