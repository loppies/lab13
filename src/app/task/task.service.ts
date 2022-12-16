import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public get(archived = false): Observable<any> {
    return this.http.get(
      `https://lab13.zecer.wi.zut.edu.pl/api/fw46508?archived=${archived}`
    );
  }

  public post(task: Task): Observable<any> {
    return this.http.post(
      'https://lab13.zecer.wi.zut.edu.pl/api/fw46508',
      task
    );
  }

  public put(task: Task): Observable<any> {
    this.http
      .put(`https://lab13.zecer.wi.zut.edu.pl/api/fw46508/${task.id}`, task)
      .subscribe((response) => {});
    return;
  }

  public deleteTask(task: Task): Observable<any> {
    this.http
      .delete(`https://lab13.zecer.wi.zut.edu.pl/api/fw46508/${task.id}`)
      .subscribe((response) => {});
    return;
  }
}
