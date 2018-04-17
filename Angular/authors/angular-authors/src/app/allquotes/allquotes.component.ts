import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-allquotes',
  templateUrl: './allquotes.component.html',
  styleUrls: ['./allquotes.component.css']
})
export class AllquotesComponent implements OnInit {

  quotes = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.quoteList();
  }
  quoteList(): void {
    console.log("HOME! GETTING ALL AUTHORS!");
    var observable = this._httpService.getQuotes();
    observable.subscribe(data => {
      this.quotes = data['quotes'];
      console.log("QUOTES LIST!", this.quotes)
    })
  }
}