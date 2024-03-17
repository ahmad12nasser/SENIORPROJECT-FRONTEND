import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: "root"
    })
export class GetPendingHiredPostsService {

    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPendingHiredPosts(client_id: number) {
        return this.http.post<any[]>(`${this.apiUrl}/client/controlRoom/getPendingHiredPosts/${client_id}`,null);
    }

}