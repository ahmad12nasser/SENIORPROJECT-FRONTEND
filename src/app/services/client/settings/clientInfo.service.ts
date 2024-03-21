import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ClientInfoService {
    private apiUrl: String = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getClientInfo(client_id: number) {
        return this.http.post<any>(`${this.apiUrl}/client/settings/getClientInfo/${client_id}`, null);
    }
}