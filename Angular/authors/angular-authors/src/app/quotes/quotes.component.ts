import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  quoteAuthor = {name: '', quotes: []};
  quotes = [];
  authorid;
  author;
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.authorid = params.get('id')
      console.log("QUOTES! GETTING AUTHOR QUOTES!", this.authorid);
      var observable = this._httpService.viewAuthor(this.authorid);
      observable.subscribe(data => {
        this.author = data['author']['name'];
        console.log(this.author);
      })
    })
    this.quoteList();
  }

  quoteList(): void {
    console.log("HOME! GETTING ALL AUTHORS!");
    var observable = this._httpService.getAuthorQuotes(this.authorid);
    console.log(this.authorid);
    observable.subscribe(data => {
      this.quotes = data['authors'];
      this.quoteAuthor = data['authors'];
      console.log("QUOTES LIST!", this.quotes)       
    })
  }

  deleteQuote(authorid, quoteid): void {
    console.log("AUTHOR", authorid)
    console.log("QUOTE", quoteid)
    this._httpService.deleteQuote(authorid, quoteid).then(data => {
      if(data['message'] =='Success!'){
        this.quotes = data['authors'];
      }
    })
  }

  voteUp(authorid, quoteid): void {
    console.log(authorid, quoteid)
    this._httpService.voteUp(authorid, quoteid).then(data => {
      console.log("VOTE UP!", data);
      if (data['message'] == "Error!") {
        this.error = data['message']
      }
      else {
        console.log("SUCCESS! VOTE UP!");
        this.quoteList()
      }
    })
  }

  voteDown(authorid, quoteid): void {
    console.log(authorid, quoteid)
    this._httpService.voteDown(authorid, quoteid).then(data => {
      console.log("VOTE DOWN!", data);
      if (data['message'] == "Error!") {
        this.error = data['message']
      }
      else {
        console.log("SUCCESS! VOTE DOWN!");
        this.quoteList()
      }
    })
  }
}