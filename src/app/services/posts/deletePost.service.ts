import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DeletePostService {
    private apiUrl: string = environment.apiUrl;
    constructor(
        private http: HttpClient
    ) { }
    //delete a post
    deletePost(post_id: number) {
        return this.http.post(`${this.apiUrl}/posts/deletePostById/${post_id}`, null);
    }
}