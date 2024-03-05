import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // hay lmethod bta3mol insert ll post 3ala el database bl backend
  createPost(postData: Post): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts/createPost`, postData);
  }

  getMyPosts(freelancerId: number): Observable<Post[]> {
    // Assume you have an endpoint to fetch posts for the logged-in user
    return this.http.post<Post[]>(`${this.apiUrl}/posts/getMyPosts/${freelancerId}`,null);
  }
}
