import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  edAuthor = { name: "" }
  author = [];
  authorid;
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.authorid = params.get('id')
      console.log("EDIT! GETTING ONE AUTHOR!", this.authorid);
      var observable = this._httpService.viewAuthor(this.authorid);
        observable.subscribe(data => {
        this.author = data['author']['name'];
        console.log(this.author);
      })
    })
  }
  editAuthor(): void {
    console.log(this.edAuthor)
    let observable = this._httpService.editAuthor(this.authorid, this.edAuthor);
    observable.subscribe(data => {
      console.log("EDIT!", data);
      this.error = data['error']['message'];
      console.log(this.error);
    })
  }
}
