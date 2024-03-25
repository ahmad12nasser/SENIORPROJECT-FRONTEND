import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { LoginService } from '../../services/authentication/login.service';
import { LoggedInUser } from '../../models/LoggedInUser';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading = false;
  submitted = false;
  loggedInUser: LoggedInUser = new LoggedInUser();
  error: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initLoginForm();
    this.loginService.logout();
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    if (this.loginForm.invalid) {
      return;
    }
    const formData = this.loginForm.value;
    let body = new HttpParams();
    body = body.set('email', formData.email);
    body = body.set('password', formData.password);
    this.loginService.login(body).pipe(first())
      .subscribe({
        next: (data) => {
          this.loggedInUser.userId = data.userId;
          this.loggedInUser.userRole = data.userRole;
          this.loginService.saveLoggedInUserId(data.userId, data.userRole);
          if (data.userRole == "freelancer") {
            this.router.navigate(['freelancer/homePage']);
          } else if (data.userRole == "client") {
            this.router.navigate(['client/homePage']);
          }
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
