import { LoggedInUser } from './../../models/LoggedInUser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedInUser: LoggedInUser = new LoggedInUser();
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<{userRole: string,  userId: number}> {
    return this.http.post<{ userId: number, userRole: string }>(`${this.apiUrl}/login`, formData);
  }

  saveLoggedInUserId(userId: number, userRole: string) {
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('userRole', userRole);
    this.loggedInUser.userId = userId;
    this.loggedInUser.userRole = userRole;
  }

  getLoggedInUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : 0;
  }

  getLoggedInUserRole(): string | null {
    return localStorage.getItem('userRole')|| this.loggedInUser.userRole;
  }

  //create function getAuthToken() 
  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
}
