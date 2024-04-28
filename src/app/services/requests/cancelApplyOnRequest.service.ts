import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CancelApplyOnRequestService{
    private apiUrl: String= environment.apiUrl;

    constructor(
        private http: HttpClient
    ){}
    //cancel apply on a request
    cancelApplyOnRequest(request_id: number,appliedRequest_id: number){
        return this.http.post(`${this.apiUrl}/freelancer/operationRoom/cancelApplyOnRequest/${request_id}/${appliedRequest_id}`, null);
    }
}