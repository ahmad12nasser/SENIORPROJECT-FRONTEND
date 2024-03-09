import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData)
      .pipe(map(user => {
        if (user && (user as any).id) {
          localStorage.setItem('userId', (user as any).id);
        }
        return user;
      }));
  }

  getLoggedInUserId(): number | 0 {
    return parseInt(localStorage.getItem('userId') || '', 0);
  }

  logout() {
    localStorage.removeItem('userId');
  }
}