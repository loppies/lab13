import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // public get(archived = false): Observable<Task[]> {}

  public post(task: Task): Observable<any> {
    console.log(task);
    return this.http.post(
      'https://lab13.zecer.wi.zut.edu.pl/api/fw46508',
      task
    );
  }

  // public put(task: Task): Observable<any> {}

  // public deleteTask(task: Task): Observable<any> {}
}
