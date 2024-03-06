import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ToDoService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllToDos(freelancerId: number): Observable<any[]>{
        return this.http.post<any[]>(`${this.apiUrl}/freelancer/toDo/${freelancerId}`, null);
    }
}