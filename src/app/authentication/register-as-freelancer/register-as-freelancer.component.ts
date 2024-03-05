import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { registerService } from '../../services/authentication/register.service';
import { AlertService } from '../../services/authentication/alert.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register-as-freelancer',
  templateUrl: './register-as-freelancer.component.html',
  styleUrls: ['./register-as-freelancer.component.css']
})
export class RegisterAsFreelancerComponent {

  registerForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;

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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      portfolio: ['', Validators.required],
      description: ['', Validators.required]
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
      const formData = this.registerForm.value;
      let body = new HttpParams();
      body = body.set('firstName', formData.firstName);
      body = body.set('lastName', formData.lastName);
      body = body.set('username', formData.username);
      body = body.set('email', formData.email);
      body = body.set('password', formData.password);
      body = body.set('confirmPassword', formData.confirmPassword);
      body = body.set('phoneNumber', formData.phoneNumber);
      body = body.set('portfolio', formData.portfolio);
      body = body.set('description', formData.description);

      this.registerService.registerFreelancer(body).subscribe({

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
}
