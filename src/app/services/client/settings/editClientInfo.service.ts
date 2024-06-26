import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EditClientInfoService {
    private apiUrl: String = environment.apiUrl;

    constructor(private http: HttpClient) { }

    updateClientInfo(formData: FormData) {
        return this.http.post<any>(`${this.apiUrl}/client/settings/editClientInfo`, formData);
    }
    updateClientImage(client: any) {
        return this.http.post(`${this.apiUrl}/client/settings/changeProfileImage`, client);
    }
}