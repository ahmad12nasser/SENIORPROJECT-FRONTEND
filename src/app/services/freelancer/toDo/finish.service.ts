import { request } from './../../../models/request';
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FinishTaskService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    FinishTask(task_id: number, appliedRequest_id: number, hiredPost_id: number, request_id: number, post_id: number) {
        const finishTask = { task_id: task_id, appliedRequest_id: appliedRequest_id, hiredPost_id: hiredPost_id, request_id: request_id, post_id: post_id };
        return this.http.post(`${this.apiUrl}/freelancer/toDo/FinishTask`, finishTask);
    }
}