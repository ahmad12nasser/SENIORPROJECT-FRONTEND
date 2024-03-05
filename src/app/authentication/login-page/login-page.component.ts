import { AlertService } from './../../services/authentication/alert.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/authentication/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  returnUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private AlertService: AlertService
  ) { }

  ngOnInit() {
    this.initLoginForm();
    // reset login status
    this.loginService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get accessToFormFields() {
    return this.loginForm.controls;
  }

  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      let body = new HttpParams();
      body = body.set('email', formData.email);
      body = body.set('password', formData.password);
      this.loginService.login(body).pipe(first())
        .subscribe({
          next: (data) => {
            this.router.navigate([this.returnUrl]);
          },
          error: (error) => {
            this.AlertService.error(error);
            this.loading = false;
          },
          complete: () => { } // Optional: Do something when the observable completes successfully
        });
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }
}
