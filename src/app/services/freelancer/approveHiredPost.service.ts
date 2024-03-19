import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApproveHiredPostService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    approveHiredPost(hiredPost_id: number) {
        return this.http.post<any>(`${this.apiUrl}/freelancer/operationRoom/acceptHiredPost/${hiredPost_id}`, null);
    }
}