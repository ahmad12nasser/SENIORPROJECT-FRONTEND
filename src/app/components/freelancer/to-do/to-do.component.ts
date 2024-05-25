import { request } from './../../../models/request';
import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../../services/freelancer/toDo/toDo.service';
import { LoginService } from '../../../services/authentication/login.service';
import { toDo } from '../../../models/toDo';
import { FinishTaskService } from '../../../services/freelancer/toDo/finish.service';
import { CancelTaskService } from '../../../services/freelancer/toDo/cancel.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent implements OnInit {
  toDos: toDo[] = [];
  constructor(
    private toDoService: ToDoService,
    private loginService: LoginService,
    private finishTaskService: FinishTaskService,
    private cancelTaskService: CancelTaskService
  ) { }

  ngOnInit() {
    this.loadToDos();
  }

  private loadToDos() {
    const freelancerId = this.loginService.getLoggedInUserId() ?? 0;
    this.toDoService.getAllToDos(freelancerId).subscribe({
      next: (data) => {
        this.toDos = data;
        this.prepareImages();
      },
      error: (error) => {
      }
    });
  }
  prepareImages() {
    for (const toDo of this.toDos) {
      toDo.clientProfileImageUrl = `data:image/png;base64,` + toDo.client_profileImage;
    }
  }

  finishTask(todo_id: number, appliedRequest_id: number, hiredPost_id: number, request_id: number, post_id: number) {
    this.finishTaskService.FinishTask(todo_id, appliedRequest_id, hiredPost_id, request_id, post_id).subscribe({
      next: (data) => {
        alert('Task finished successfully');
        this.ngOnInit();
      },
      error: (error) => {
        alert('error while finishing the task');
      }
    });
  }
  cancelTask(todo_id: number, appliedRequest_id: number, hiredPost_id: number, request_id: number, post_id: number) {
    this.cancelTaskService.cancelTask(todo_id, appliedRequest_id, hiredPost_id, request_id, post_id).subscribe({
      next: (data) => {
        alert('Task cancelled successfully');
        this.ngOnInit();
      },
      error: (error) => {
        alert('error while cancelling the task');
      }
    });
  }
}
