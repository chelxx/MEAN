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

  //DOES NOT WORK YET
  deleteTask(): void {
    console.log(this.taskid);
    let observable = this._httpService.deleteTask(this.taskid);
    observable.subscribe(data => {
      console.log("DELETE!", data);
    })
  }
  editTask(): void {
    this.task = this.task;
    let observable = this._httpService.editTask(this.task, this.taskid);
    observable.subscribe(data => {
      console.log("EDIT!", data);
    })
  }
  // END

  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getTasksFromService();
    this.newTask = { title: "", description: "" }
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