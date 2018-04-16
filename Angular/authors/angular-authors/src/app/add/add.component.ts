import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  newAuthor = { name: "" };

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  addAuthor(): void {
    console.log("ADD! ADDING AN AUTHOR!");
    var observable = this._httpService.createAuthor(this.newAuthor);
    observable.subscribe(data => {
      console.log("FORM DATA!", data);
      this.newAuthor = { name: "" }
    })
  }
}
