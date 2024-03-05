import { ActivatedRoute, Router } from '@angular/router';
import { registerService } from './../../services/authentication/register.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/authentication/alert.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register-as-client',
  templateUrl: './register-as-client.component.html',
  styleUrl: './register-as-client.component.css'
})
export class RegisterAsClientComponent {

  registerForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;

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
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobile: ['', Validators.required],
      profileImage: ['', Validators.required]
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
      const formData = this.registerForm.value;
      let body = new HttpParams();
      body = body.set('firstName', formData.firstName);
      body = body.set('lastName', formData.lastName);
      body = body.set('userName', formData.userName);
      body = body.set('email', formData.email);
      body = body.set('password', formData.password);
      body = body.set('confirmPassword', formData.confirmPassword);
      body = body.set('mobile', formData.mobile);
      body = body.set('profileImage', formData.profileImage);
      this.registerService.registerClient(body)
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
  // redirect 3ala el page ely feha el form ely by3ml login
  backToLogin() {
    this.Router.navigate(['/login']), { relativeTo: this.Route };
  }
}
