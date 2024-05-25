import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerService } from '../../services/authentication/register.service';
import { AlertService } from '../../services/authentication/alert.service';
import { HttpParams } from '@angular/common/http';
import { ProfessionCategories } from '../../models/profession_categ';
import { Locations } from '../../models/locations';

@Component({
  selector: 'app-register-as-freelancer',
  templateUrl: './register-as-freelancer.component.html',
  styleUrls: ['./register-as-freelancer.component.css']
})
export class RegisterAsFreelancerComponent {

  registerForm: FormGroup = new FormGroup({});
  categoryList = new ProfessionCategories();
  locationList = new Locations();
  loading = false;
  submitted = false;
  selectedFile: File | null = null;
  selectedCategory: string = '';
  selectedLocation: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private registerService: registerService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      portfolio: [''],
      description: [''],
      location: ['', Validators.required],
      professionName: ['', Validators.required],
      age: ['',Validators.required],
    });
  }

  get accessToFormFields() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.registerForm.value.firstName);
      formData.append('lastName', this.registerForm.value.lastName);
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
      formData.append('confirmPassword', this.registerForm.value.confirmPassword);
      formData.append('phoneNumber', this.registerForm.value.phoneNumber);
      if (this.selectedFile) {
        formData.append('portfolio', this.selectedFile);
      }
      formData.append('location', this.selectedLocation);
      formData.append('description', this.registerForm.value.description);
      formData.append('professionName', this.selectedCategory);
      formData.append('age', this.registerForm.value.age);


      console.log(this.selectedCategory, this.selectedLocation);


      this.registerService.registerFreelancer(formData).subscribe({

        next: (data) => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error.error.msg || 'Registration failed. Please try again.');
          this.loading = false;
        }
      });
    }
  }

  backToLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
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
