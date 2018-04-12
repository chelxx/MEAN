import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getTasks();
  }

  getTasks() {
    return this._http.get('/tasks');
  }
  getTaskByID(taskid) {
    return this._http.get(`/viewtask/${taskid}`);
  }
}