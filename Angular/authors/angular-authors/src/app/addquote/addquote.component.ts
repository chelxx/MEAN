import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addquote',
  templateUrl: './addquote.component.html',
  styleUrls: ['./addquote.component.css']
})
export class AddquoteComponent implements OnInit {

  quoteAuthor = {name: "", quotes: []};
  newQuote = { quote: "" };
  quotes = [];
  authorid;
  author;
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

  addQuote(): void {
    console.log("ADDQ! ADDING A QUOTE!");
    console.log(this.newQuote, this.authorid, this.author)
    var observable = this._httpService.createQuote(this.authorid, this.newQuote);
    observable.subscribe(data => {
      if(data['message'] == "Success!") {
        console.log("ADDQ! SUCCESSFULLY ADDED A QUOTE!");
        this._router.navigate([`/quotes/${this.authorid}`]);
      }
      else {
        console.log("ADDQ! SOMETHING WENT WRONG ADDING A QUOTE!");
        this.error = data['error'];
        console.log(this.error)
      }
    })
  }
}
