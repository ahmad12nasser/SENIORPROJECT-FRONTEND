import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EditFreelancerInfoService {
    private apiUrl: String = environment.apiUrl;

    constructor(private http: HttpClient) { }

    updateFreelancerInfo(freelancer: any) {
        return this.http.post(`${this.apiUrl}/freelancer/settings/editFreelancerInfo`, freelancer);
    }
}