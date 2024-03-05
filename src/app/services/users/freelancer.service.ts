import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FreelancerService {
    
    private apiUrl: string = environment.apiUrl;
    
    constructor(private http: HttpClient) {}

    getFreelancerById(id: number) {
        return this.http.get(`${this.apiUrl}/freelancer/${id}`);
    }
    
}