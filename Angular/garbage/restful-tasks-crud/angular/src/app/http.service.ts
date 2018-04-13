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
  addTask(newTask){
    return this._http.post('/newtask', newTask);
  }
  deleteTask(taskid){
    return this._http.delete(`/deletetask/${taskid}`);
  }
  editTask(taskid, task){
    return this._http.put(`/updatetask/${taskid}`, task);
  }
}