import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class GetWaitingAppliedRequestsService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getWaitingAppliedRequests(freelancer_id: number) {
        return this.http.post<any>(`${this.apiUrl}/freelancer/operationRoom/getWaitingAppliedRequests/${freelancer_id}`, null);
    }
}