import { Component, OnInit } from '@angular/core';
import { toDo } from '../../../models/toDo';
import { ToDoService } from '../../../services/freelancer/toDo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit{
  toDos: toDo[] = [];

  constructor(private toDoService: ToDoService){}

  ngOnInit(){
    this.loadToDos();
  }

  private loadToDos(){
    //const freelancerId = this.getFreelancerIdFromLocalStorage();
    //3amalet haydi lconst ta a3tiya value benma sha8el login ta ye5oud mn localStorage lId
    const freelancerId = 1;
    this.toDoService.getAllToDos(freelancerId).subscribe({
      next: (data) => {
        this.toDos = data;
        console.log('Successfully fetched toDos:', true);
      },
      error: (error) => {
        console.error('Error fetching toDos:', error);
      }
    });
  }

  private getFreelancerIdFromLocalStorage(): number {
    return Number(localStorage.getItem('userId'));
  }
}
