import { Component } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { LoginService } from '../../../services/authentication/login.service';
import { ProfessionCategories } from '../../../models/profession_categ';
import { Locations } from '../../../models/locations';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {
  categoryList = new ProfessionCategories();
  locationList = new Locations();
  newRequest: any = {}; // Update the type accordingly
  selectedFile: File | null = null;
  selectedCategory: string = '';
  selectedLocation: string = '';

  constructor(
    private requestService: RequestsService,
    private loginService: LoginService
  ) { }

  submitRequest() {

    this.newRequest.client_id = this.loginService.getLoggedInUserId() ?? 0;
    this.newRequest.categ_name = this.selectedCategory;
    this.newRequest.location = this.selectedLocation;

    const formData = new FormData();
    formData.append('client_id', this.newRequest.client_id);
    formData.append('title', this.newRequest.title);
    formData.append('description', this.newRequest.description);
    formData.append('categ_name', this.newRequest.categ_name);
    formData.append('location', this.newRequest.location);
    formData.append('deadline', this.newRequest.deadline);
    formData.append('datePosted', this.newRequest.datePosted);
    formData.append('price', this.newRequest.price);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Send the formData to the backend
    this.requestService.createRequest(formData).subscribe({
      next: (data) => {
        console.log('Successfully submitted request:', data);
        this.newRequest = {}; // Reset newRequest
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('Error submitting request:', error);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedFile = file;
    }
  }
}
