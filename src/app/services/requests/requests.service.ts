import { request } from './../../models/request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginService } from '../authentication/login.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl: string = environment.apiUrl;
  request: request[] = [];
  constructor(
    private http: HttpClient,
    private loginService: LoginService
    ) { }

  // Create a new request
  createRequest(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/createRequest`, formData);
  }
  // Fetch all requests from the backend
  getRequests(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/requests/getAllRequestsWithClientInfo`, null);
  }
  // Apply for a request
  applyForRequest(requestId: number, clientId: number): Observable<any> {
    //wa2tiyan ra7 a3mel temp id lal freelancer
    const freelancerId = this.loginService.getLoggedInUserId() ?? 0;
    // Check if the clientId is available
    if (clientId) {
      const appliedRequests = { requestId: requestId, clientId: clientId, freelancerId: freelancerId };
      return this.http.post(`${this.apiUrl}/requests/applyForRequest`, appliedRequests);
    } else {
      // Handle the case when clientId is not available
      console.error('Client ID not available for the selected request.');
      return throwError('Client ID not available');
    }
  }
}
