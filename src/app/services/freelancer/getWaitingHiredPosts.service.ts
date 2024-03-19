import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class GetWaitingHiredPostsService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getWaitingHiredPosts(freelancer_id: number) {
        return this.http.post<any>(`${this.apiUrl}/freelancer/operationRoom/getWaitingHiredPosts/${freelancer_id}`, null);
    }
}