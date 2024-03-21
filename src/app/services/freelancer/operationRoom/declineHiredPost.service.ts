import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DeclineHiredPostService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    declineHiredPost(hiredPost_id: number) {
        return this.http.post<any>(`${this.apiUrl}/freelancer/operationRoom/rejectHiredPost/${hiredPost_id}`, null);
    }
}