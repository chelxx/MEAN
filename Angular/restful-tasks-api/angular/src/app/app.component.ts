import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks = [];
  task = [];
  banana = false;
  notbanana = false;
  newTask: any;
  edTask: any;
  taskid;
  
  getAllTasks(): void { 
    console.log(`Click event is working`);
    this.tasks = this.tasks;
    this.banana = true;
    console.log("BTN CLICK!", this.tasks);
  }
  getOneTask(): void { 
    console.log(`Click2 event is working`);
    console.log(this.taskid);
    this.notbanana = true;
    let observable = this._httpService.getTaskByID(this.taskid);
    observable.subscribe(data => {
       console.log("ONE TASK!", data)
       this.task = data['result'];
       console.log("TEST!", this.task);
    });
  }
  createTask(): void {
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log("FORM DATA!", data);
      this.newTask = { title: "", description: "" }
    })
  }
  deleteThis(taskid): void {
    console.log(taskid);
    let observable = this._httpService.deleteTask(taskid);
    observable.subscribe(data => {
      console.log("DELETE!", data);
    })
  }
  editOpen(taskid): void {
    this.banana = true;    
    let observable = this._httpService.getTaskByID(taskid);
    observable.subscribe(data => {
       console.log("ONE TASK!", data)
       this.task = data['result'];
       console.log("TEST!", this.task);
    });
  }
  editThis(taskid): void {
    console.log(taskid, this.edTask)
    let observable = this._httpService.editTask(taskid, this.edTask);
    observable.subscribe(data => {
      console.log("EDIT!", data);
    })
  }

  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getTasksFromService();
    this.newTask = { title: "", description: "" }
    this.edTask = { title: "", description: "" }
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
       console.log("Got our tasks!", data)
       this.tasks = data['result'];
       console.log("TEST!", this.tasks);
      //  this.tasks = ["one", "two", "three"];
    });
  }
}