import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AcceptApplyRequestService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    acceptApplyRequest(appliedRequest_id: number){
        return this.http.post<any>(`${this.apiUrl}/client/controlRoom/acceptApplyRequest/${appliedRequest_id}`, null);
    }
}