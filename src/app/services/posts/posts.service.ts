import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // hay lmethod bta3mol insert ll post 3ala el database bl backend
  createPost(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/posts/createPost`, formData);
  }
  // hay lmethod bta3mol get ll posts ely 3amalhom el freelancer
  getMyPosts(freelancerId: number): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.apiUrl}/posts/getMyPosts/${freelancerId}`, null);
  }
  // hay lmethod bta3mol get ll posts ely 3amalinoun kel el freelancers
  getAllPosts(): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.apiUrl}/posts/getAllPosts`, null);
  }
  // hay lmethod bta3mol hiring 3ala specific post 

}
