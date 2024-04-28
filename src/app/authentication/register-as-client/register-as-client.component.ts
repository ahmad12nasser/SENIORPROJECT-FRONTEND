import { ActivatedRoute, Router } from '@angular/router';
import { registerService } from './../../services/authentication/register.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/authentication/alert.service';
import { HttpParams } from '@angular/common/http';
import { Locations } from '../../models/locations';

@Component({
  selector: 'app-register-as-client',
  templateUrl: './register-as-client.component.html',
  styleUrl: './register-as-client.component.css'
})
export class RegisterAsClientComponent {

  registerForm: FormGroup = new FormGroup({});
  locations = new Locations();
  selectedLocation: string = '';
  loading = false;
  submitted = false;
  selectedFile: File | null = null;

  constructor(
    private FormBuilder: FormBuilder,
    private registerService: registerService,
    private Router: Router,
    private Route: ActivatedRoute,
    private AlertService: AlertService,
  ) { }

  ngOnInit() {
    this.initRegisterForm();
  }

  initRegisterForm() {
    this.registerForm = this.FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobile: ['', Validators.required],
      profileImage: [''],
      age: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });
  }
  get accessToFormFields() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // hon bi wa2ef iza ma 3am yd5ol 3al form
    if (this.registerForm.invalid) {
      return;
    }
    if (this.registerForm.valid) {
      const formData = new FormData(); 
      formData.append('firstName',this.registerForm.value.firstName);
      formData.append('lastName',this.registerForm.value.lastName);
      formData.append('email',this.registerForm.value.email);
      formData.append('password',this.registerForm.value.password);
      formData.append('confirmPassword',this.registerForm.value.confirmPassword);
      formData.append('mobile',this.registerForm.value.mobile);
      if (this.selectedFile) {
        formData.append('profile_image',this.selectedFile);
      }
      formData.append('age',this.registerForm.value.age);
      formData.append('location',this.selectedLocation);
      formData.append('description',this.registerForm.value.description);

      this.registerService.registerClient(formData)
        .subscribe({
          next: (data) => {
            this.AlertService.success('Registration successful', true);
            this.Router.navigate(['/login']), { relativeTo: this.Route };
          },
          error: (error) => {
            this.AlertService.error(error);
            this.loading = false;
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
  onLocationSelected(event: any) {
    this.selectedLocation = event.target.value;
  }
  // redirect 3ala el page ely feha el form ely by3ml login
  backToLogin() {
    this.Router.navigate(['/login']), { relativeTo: this.Route };
  }
}
