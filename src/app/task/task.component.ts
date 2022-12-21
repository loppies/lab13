import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  state: boolean = false;
  title?: string;
  deadline?: Date;
  retrievedData: any;
  task: Array<Task> = new Array<Task>();
  archiwum: boolean = true;

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

  isDisabled() {
    for (let i = 0; i < this.task.length; i++) {
      if (this.task[i].completed == true) {
        this.archiwum = false;
        return;
      }
    }
    this.archiwum = true;
  }

  private switchTaskChanged(task: Task) {
    if (task.completed == true) {
      task.completed = false;
    } else {
      task.completed = true;
    }
    this.taskService.put(task);
    setTimeout(this.loadElements.bind(this, true), 50);
    setTimeout(this.isDisabled.bind(this), 100);
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
      div.style.borderWidth = '2px';
      div.style.borderColor = '#424242';
      div.style.marginBottom = '25px';
      div.style.padding = '12px 28px';
      div.id = `${this.task[i].id}`;

      let p = document.createElement('p');
      p.innerText = this.task[i].title;
      p.style.margin = '10px';

      let div2 = document.createElement('div');
      let input = document.createElement('input');
      let label = document.createElement('label');
      label.innerText = 'Wykonane';
      input.type = 'checkbox';
      label.style.margin = '0px 0px -20px'
      div2.style.position = 'absolute';
      div2.style.right = '590px';
      div2.style.marginTop = '-35px';
      div2.style.padding = '20px 20px'
      input.id = `${this.task[i].id}`;
      input.addEventListener(
        'click',
        this.switchTaskChanged.bind(
          this,
          this.task.find((task) => task.id === parseInt(input.id))
        )
      );
      div2.appendChild(label);
      div2.appendChild(input);
      if (this.task[i].completed == true) {
        input.style.accentColor = '#69F0AE';
        div.style.backgroundColor = '#424242';
        div.style.color = 'white';
        input.checked = true;
        input.style.accentColor = '#69F0AE';
      } else {
        input.checked = false;
        div.style.backgroundColor = '#424242';
        div.style.color = 'white';
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
      div.appendChild(div2);

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
