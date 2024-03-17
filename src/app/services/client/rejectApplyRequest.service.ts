import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable ({
    providedIn: 'root',
})
export class RejectApplyRequestService {
    private apiUrl: string = environment.apiUrl;

    constructor (private http: HttpClient){}

    rejectApplyRequest(appliedRequest_id: number){
        return this.http.post<any>(`${this.apiUrl}/client/controlRoom/rejectApplyRequest/${appliedRequest_id}`, null);
    }
}