import { request } from './../../models/request';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl: string = environment.apiUrl;
  request: request[] = [];
  constructor(private http: HttpClient) { }
  //lama btezbat login berja3 bsha8ela
  /* getFreelancerIdFromLocalStorage(): number {
     return Number(localStorage.getItem('userId'));
   }*/

  // Create a new request
  createRequest(request: request): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/createRequest`, request);
  }
  // Fetch all requests from the backend
  getRequests(): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/requests/getAllRequestsWithClientInfo`, null);
  }
  // Apply for a request
  applyForRequest(requestId: number, clientId: number): Observable<any> {
    //wa2tiyan ra7 a3mel temp id lal freelancer
    const freelancerId = 1;
    // Check if the clientId is available
    if (clientId) {
    const  appliedRequests = { requestId: requestId, clientId: clientId, freelancerId: freelancerId };
      return this.http.post(`${this.apiUrl}/requests/applyForRequest`, appliedRequests);
    } else {
      // Handle the case when clientId is not available
      console.error('Client ID not available for the selected request.');
      return throwError('Client ID not available');
    }
  }
}
