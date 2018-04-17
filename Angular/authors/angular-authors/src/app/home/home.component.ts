import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authors = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.authorList();
  }

  authorList(): void {
    console.log("HOME! GETTING ALL AUTHORS!");
    var observable = this._httpService.getAuthors();
    observable.subscribe(data => {
      this.authors = data['authors'];
      console.log("AUTHOR LIST!", this.authors)
    })
  }

  deleteAuthor(authorid): void {
    this._httpService.deleteAuthor(authorid).then(data => {
      if(data['message'] =='Success!'){
        this.authors = data['authors'];
      }
    })
  }
}