// client-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/authentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.getLoggedInUserRole() === 'client') {
      return true;
    } else {
      this.router.navigate(['/access-denied']); // Redirect to access denied page
      return false;
    }
  }
}
