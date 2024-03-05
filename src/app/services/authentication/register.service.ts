import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class registerService{
    private apiUrl: String = environment.apiUrl;
    constructor(private http: HttpClient){}

    registerFreelancer(formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register/freelancer`, formData);
      }

    registerClient(formData: any){
        return this.http.post(`${this.apiUrl}/register/client`, formData);
    }
}