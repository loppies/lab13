import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  title?: string;
  deadline?: Date;
  completed?: boolean;
  archived?: boolean;
  // taskService: TaskService = new TaskService();
  constructor() {}

  addTask() {
    let newTask: Task = new Task();
    newTask.title = this.title;
    newTask.deadline = this.deadline;
    newTask.completed = false;
    newTask.archived = false;
    console.log(newTask);
    // this.taskService.post(newTask);
  }

  ngOnInit() {}
}
