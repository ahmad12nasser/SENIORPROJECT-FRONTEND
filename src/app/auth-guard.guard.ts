import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LoginService } from './services/authentication/login.service';
import { Observable } from 'rxjs';

export const AuthGuard = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.getLoggedInUserId()) {
    return true; // Allow access
  } else {
    router.navigate(['/login']);
    return false; // Deny access
  }
};
