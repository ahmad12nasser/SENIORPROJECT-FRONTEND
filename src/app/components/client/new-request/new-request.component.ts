import { Component } from '@angular/core';
import { RequestsService } from '../../../services/requests/requests.service';
import { LoginService } from '../../../services/authentication/login.service';
import { ProfessionCategories } from '../../../models/profession_categ';
import { Locations } from '../../../models/locations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {
  categoryList = new ProfessionCategories();
  locationList = new Locations();
  newRequest: FormGroup = new FormGroup({});
  selectedFile: File | null = null;
  selectedCategory: string = '';
  selectedLocation: string = '';
  submitted = false;
  constructor(
    private requestService: RequestsService,
    private loginService: LoginService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initRequestForm();
  }
  initRequestForm() {
    this.newRequest = this.FormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      categ_name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      deadline: ['', Validators.required],
      image: ['']
    });
  }
  get accessToFormFields() {
    return this.newRequest.controls;
  }

  submitRequest() {
    this.submitted = true;
    if (this.newRequest.invalid) {
      return;
    }
    if (this.newRequest.valid) {

    const formData = new FormData();
    // Get the client_id from the logged in user
    const client_id = this.loginService.getLoggedInUserId() ?? 0;
    formData.append('client_id', client_id.toString());
    formData.append('title', this.newRequest.value.title);
    formData.append('description', this.newRequest.value.description);
    formData.append('categ_name', this.newRequest.value.categ_name);
    formData.append('location', this.newRequest.value.location);
    formData.append('deadline', this.newRequest.value.deadline);
    formData.append('price', this.newRequest.value.price);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Send the formData to the backend
    this.requestService.createRequest(formData).subscribe({
      next: (data) => {
        alert('Request created successfully');
        this.newRequest.reset();// Reset newRequest
        this.selectedFile = null;
      },
      error: (error) => {
        alert('An error occurred while creating the request');
      }
    });
  }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (file) {
      this.selectedFile = file;
    }
  }
  onCategorySelected(event: any){
    this.selectedCategory = event.target.value;
  }
  onLocationSelected(event: any){
    this.selectedLocation = event.target.value;
  }
}
