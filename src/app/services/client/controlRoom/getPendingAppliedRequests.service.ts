import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GetPendingAppliedRequestsService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getPendingAppliedRequests(client_id: number) {
        return this.http.post<any>(`${this.apiUrl}/client/controlRoom/getPendingAppliedRequests/${client_id}`, null);
    }
}