import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products;

  constructor(private _httpService: HttpService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.productList();
  }

  productList(): void {
    console.log("PRODUCT-COMP! GETTING ALL PRODUCTS!");
    var observable = this._httpService.getProducts();
    observable.subscribe(data => {
      this.products = data['products'];
      console.log("PRODUCTS LIST!", this.products)
    })
  }

  deleteProduct(productID): void {
    console.log("PRODUCT-COMP! DELETING A PRODUCT!");
    this._httpService.deleteProduct(productID).then(data => {
      if(data['message'] == "Success!") {
        console.log("PRODUCT-COMP! DELETION SUCCESS!");
        this.productList();
      }
    })
  }
}
