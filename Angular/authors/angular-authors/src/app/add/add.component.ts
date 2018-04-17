import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  newAuthor = { name: "" };
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  addAuthor(): void {
    console.log("ADD! ADDING AN AUTHOR!");
    var observable = this._httpService.createAuthor(this.newAuthor);
    observable.subscribe(data => {
      if(data['message'] == "Success!") {
        console.log("ADDQ! SUCCESSFULLY ADDED A QUOTE!");
        this.newAuthor = { name: "" }
        this._router.navigate(['/home']);
      }
      else {
        console.log("ADDQ! SOMETHING WENT WRONG ADDING A QUOTE!");
        this.error = data['error']['message'];
        console.log(this.error)
      }
    })
  }
}