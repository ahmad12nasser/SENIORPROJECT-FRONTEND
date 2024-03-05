import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { toDo } from '../../models/toDo';
@Injectable({
    providedIn: 'root'
})
export class ToDoService {
    private apiUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllToDos(freelancerId: number): Observable<toDo[]>{
        return this.http.post<toDo[]>(`${this.apiUrl}/freelancer/toDo/${freelancerId}`, null);
    }
}