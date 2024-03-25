import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {
    private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/api/image`, formData);
  }
}
