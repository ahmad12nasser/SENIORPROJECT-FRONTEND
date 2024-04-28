import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeleteRequestService{
    private apiUrl: string = environment.apiUrl;
    constructor(
        private http: HttpClient
    ){}
    //delete a request
    deleteRequest(request_id: number){
        return this.http.post(`${this.apiUrl}/requests/deleteRequestById/${request_id}`, null);
    }
}