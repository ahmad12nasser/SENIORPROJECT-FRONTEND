import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CancelHireOnPostService {
    private apiUrl : string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ){}
    // cancel hire on post
    cancelHireOnPost(post_id: number,hiredPost_id: number){
        const formForIds = { post_id: post_id, hiredPost_id: hiredPost_id };
        return this.http.post(`${this.apiUrl}/client/controlRoom/cancelHireOnPost`,formForIds);
    }

}