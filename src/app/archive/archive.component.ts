import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  task: Array<Task> = new Array<Task>();
  constructor(private taskService: TaskService) {}

  loadElementsOnSite(data: Object[], reload: boolean = false) {
    if (reload == true) {
      let mainDiv = document.getElementById('newEls');
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

      let button = document.createElement('button');
      button.type = 'button';
      button.innerText = 'usuń';
      button.style.position = 'absolute';
      button.style.right = '25px';
      button.style.marginTop = '-37px';
      button.id = `${this.task[i].id}`;
      button.addEventListener('click', this.delete.bind(this, this.task[i]));

      if (this.task[i].deadline != null) {
        let label = document.createElement('label');
        label.style.fontWeight = 'bold';
        label.style.margin = '10px';
        label.innerText = String(this.task[i].deadline);
        div.appendChild(label);
      } else {
        button.style.marginTop = '-29px';
      }

      div.appendChild(p);
      div.appendChild(button);

      let mainDiv = document.getElementById('newEls');
      mainDiv.appendChild(div);
    }
  }

  delete(task: Task) {
    this.taskService.deleteTask(task);
    setTimeout(this.loadElements.bind(this, true), 100);
  }

  loadElements(reload: boolean = false) {
    this.taskService.get(true).subscribe((data) => {
      this.loadElementsOnSite(data, reload);
    });
  }

  ngOnInit() {
    this.loadElements();
  }
}
