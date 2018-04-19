import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.css']
})
export class OneproductComponent implements OnInit {

  edProduct = { title: "", price: null, url: "" };
  productID;
  error;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.productID = params.get('id');
      var observable = this._httpService.oneProduct(this.productID);
      observable.subscribe(data => {
        this.edProduct = data['product']
        console.log("EDIT-COMP! ONE PRODUCT!");
      })
    })
  }

  editProduct(productID): void {
    console.log("EDIT-COMP! EDITING A PRODUCT!", this.productID, this.edProduct);
    this._httpService.editProduct(this.productID, this.edProduct).then(data => {
      if(data['message'] == 'Success!'){
        console.log("EDIT-COMP! EDIT PRODUCT SUCCESS!", this.edProduct);        
        this._router.navigate(['/product']);
      }
      else {
        console.log("EDIT-COMP! EDIT NOTE ERROR!");
      }
    })
  }
}