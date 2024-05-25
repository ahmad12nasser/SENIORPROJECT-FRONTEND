import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable ({
    providedIn: 'root',
})
export class RejectApplyRequestService {
    private apiUrl: string = environment.apiUrl;

    constructor (private http: HttpClient){}

    rejectApplyRequest(formData: any){
        return this.http.post<any>(`${this.apiUrl}/client/controlRoom/rejectApplyRequest`, formData);
    }
}