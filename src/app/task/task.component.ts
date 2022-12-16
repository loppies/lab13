import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  title?: string;
  deadline?: Date;
  retrievedData: any;
  task: Array<Task> = new Array<Task>();

  constructor(private taskService: TaskService) {}

  addBtnClick() {
    if (this.title == null) {
      return;
    }
    let newTask: Task = new Task();
    newTask.title = this.title;
    newTask.deadline = this.deadline;
    newTask.completed = false;
    newTask.archived = false;
    this.taskService.post(newTask).subscribe((response) => {
      console.log(response);
    });
    setTimeout(this.loadElements.bind(this, true), 50);
    this.title = null;
    this.deadline = null;
  }

  archiveCompleted() {
    for (let i = 0; i < this.task.length; i++) {
      if (this.task[i].completed) {
        this.task[i].archived = true;
        this.taskService.put(this.task[i]);
      }
    }
    setTimeout(this.loadElements.bind(this, true), 50);
  }

  private switchTaskChanged(task: Task) {
    if (task.completed == true) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    this.taskService.put(task);
    setTimeout(this.loadElements.bind(this, true), 50);
  }

  loadElementsOnSite(data: Object[], reload: boolean = false) {
    if (reload == true) {
      let mainDiv = document.getElementById('newElements');
      mainDiv.replaceChildren();
    }
    this.task = data;
    for (let i = 0; i < this.task.length; i++) {
      let div = document.createElement('div');
      div.style.borderStyle = 'solid';
      div.style.borderWidth = '1px';
      div.style.marginBottom = '25px';
      div.id = `${this.task[i].id}`;

      let p = document.createElement('p');
      p.innerText = this.task[i].title;
      p.style.margin = '10px';

      let input = document.createElement('input');
      input.type = 'checkbox';
      input.style.position = 'absolute';
      input.style.right = '25px';
      input.style.marginTop = '-37px';
      input.id = `${this.task[i].id}`;
      input.addEventListener(
        'click',
        this.switchTaskChanged.bind(
          this,
          this.task.find((task) => task.id === parseInt(input.id))
        )
      );
      if (this.task[i].completed == true) {
        div.style.backgroundColor = '#ADADAD';
        input.checked = true;
      } else {
        input.checked = false;
        div.style.backgroundColor = 'white';
      }

      if (this.task[i].deadline != null) {
        let label = document.createElement('label');
        label.style.fontWeight = 'bold';
        label.style.margin = '10px';
        label.innerText = String(this.task[i].deadline);
        div.appendChild(label);
      } else {
        input.style.marginTop = '-25px';
      }

      div.appendChild(p);
      div.appendChild(input);

      let mainDiv = document.getElementById('newElements');
      mainDiv.appendChild(div);
    }
  }

  loadElements(reload: boolean = false) {
    this.taskService.get().subscribe((data) => {
      this.loadElementsOnSite(data, reload);
    });
  }

  ngOnInit() {
    this.loadElements();
  }
}
