import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FreelancerInfoService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getFreelancerInfo(freelancer_id: number) {
        return this.http.post<any>(`${this.apiUrl}/freelancer/settings/getFreelancerInfo/${freelancer_id}`, null);
    }
    getRatingWithComments(freelancer_id: number) {
        return this.http.post<any>(`${this.apiUrl}/settings/getRatingWithComments/${freelancer_id}`, null);
    }
}