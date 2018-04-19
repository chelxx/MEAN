import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  newProduct = { title: "", price: null, url: "" };
  todaysdate;
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
  }

  addProduct(): void {
    console.log("ADD-COMP! ADDING A PRODUCT!");
    var observable = this._httpService.addProduct(this.newProduct);
    observable.subscribe(data => {
      if(data['message'] == "Success!") {
        console.log("ADD-COMP! ADD PRODUCT SUCCESS!");
        this.newProduct = { title: "", price: null, url: "" }
        this._router.navigate(['/product']);
      }
      else {
        console.log("ADD-COMP! ADD PRODUCT ERROR!");
        this.error = data['error']['message'];
        console.log(this.error)
      }
    })
  }
}