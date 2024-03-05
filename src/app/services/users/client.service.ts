import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
    })
export class ClientService {
    private apiUrl: String =  environment.apiUrl;
    constructor(private http: HttpClient) {}
    getClientById(id: number) {
        return this.http.get(`${this.apiUrl}/client/${id}`);
    }
}