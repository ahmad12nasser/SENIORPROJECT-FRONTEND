import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../../services/freelancer/toDo/toDo.service';
import { LoginService } from '../../../services/authentication/login.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  toDos: any[] = [];
  imageUrl1: string = '';
  imageUrl2: string = '';
  constructor(
    private toDoService: ToDoService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loadToDos();
  }

  private loadToDos() {
    //const freelancerId = this.getFreelancerIdFromLocalStorage();
    const freelancerId = this.loginService.getLoggedInUserId() ?? 0;
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
  prepareImages() {
    for (const toDo of this.toDos) {
      this.imageUrl1 = 'data:image/jpeg;base64,' + toDo.post_image;
      this.imageUrl2 = 'data:image/jpeg;base64,' + toDo.request_image;
    }
  }
}
