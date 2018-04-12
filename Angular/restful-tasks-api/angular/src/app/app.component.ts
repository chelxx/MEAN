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

  taskid;
  
  onButtonClick(): void { 
    console.log(`Click event is working`);
    this.tasks = this.tasks;
    this.banana = true;
    console.log("BTN CLICK!", this.tasks);
  }
  onSubmit(): void { 
    console.log(`Click2 event is working`);
    console.log(this.taskid);
    this.notbanana = true;
    let observable = this._httpService.getTaskByID(this.taskid);
    observable.subscribe(data => {
       console.log("Got one task!", data)
       this.task = data['result'];
       console.log("TEST!", this.task);
    });
  }

  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getTasksFromService();
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