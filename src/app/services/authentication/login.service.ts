import { LoggedInUser } from './../../models/LoggedInUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUser: LoggedInUser = new LoggedInUser();
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  login(formData: any): Observable<{userRole: string,  userId: number}> {
    return this.http.post<{ userId: number, userRole: string }>(`${this.apiUrl}/login`, formData);
  }

  saveLoggedInUserId(userId: number, userRole: string) {
    sessionStorage.setItem('userId', userId.toString());
    sessionStorage.setItem('userRole', userRole);
    this.loggedInUser.userId = userId;
    this.loggedInUser.userRole = userRole;
  }

  getLoggedInUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  getLoggedInUserRole(): string | null {
    return sessionStorage.getItem('userRole');
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem('userId') !== null;
  }
  //create function getAuthToken() 
  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('token');
    this.loggedInUser.userId = 0;
    this.loggedInUser.userRole = '';
    this.router.navigate(['/login']);
  }
}
