import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from './services/authentication/login.service';
import { HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable() // Optional for clarity, as interceptors are providers
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.loginService.getAuthToken();
    if (authToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(req); // Pass the modified request to the next interceptor
  }
}
