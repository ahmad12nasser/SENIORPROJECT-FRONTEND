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
    this.editFreelancerInfoService.updateFreelancerInfo(this.editingFreelancer).subscribe({
      next: (response) => {
        console.log('Freelancer info updated successfully:', response);
        this.editingFreelancer = {};
        this.editMode = false;
        this.refreshFreelancerInfo();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating freelancer info:', error);
      }
    });
  }

  cancelEdit() {
    this.editingFreelancer = {};
    this.editMode = false;
  }

  refreshFreelancerInfo() {
    const freelancer_id = this.loginService.getLoggedInUserId() ?? 0;
    this.getFreelancerInfo(freelancer_id);
  }

  logout(){
    this.authService.logout();
    this.loginService.logout();
  }
}
