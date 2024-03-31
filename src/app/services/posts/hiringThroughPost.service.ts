import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class HiringService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient){}
    
    //hire a freelancer through a post
    HireInSpecificPost(postId: number, freelancerId: number): Observable<any> {
        //wa2tiyan ra7 a3mel temp id lal client
        const clientId = 1;
        // Check if the freelancerId is available
        if (freelancerId) {
          const appliedPosts = { postId: postId, freelancerId: freelancerId, clientId: clientId};
          return this.http.post(`${this.apiUrl}/posts/HiringThroughPost`, appliedPosts);
        } else {
          // Handle the case when freelancerId is not available
          console.error('Freelancer ID not available for the selected post.');
          return throwError('Freelancer ID not available');
        }
      }
  }