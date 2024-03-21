import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { request } from "../../../models/request";

@Injectable({
    providedIn: "root"
    })
export class GetMyRequestsService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getMyRequests(clientId: number) {
        return this.http.post<request[]>(`${this.apiUrl}/client/getMyRequests/${clientId}`,null);
    }
}