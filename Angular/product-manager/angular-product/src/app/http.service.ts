import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProducts() {
    console.log('SERVICE! GETTING ALL THE PRODUCTS!')
    return this._http.get('/api/products');
  }

  addProduct(newProduct) {
    console.log('SERVICE! CREATING A PRODUCT!')
    return this._http.post('/api/products', newProduct);
  }

  deleteProduct(productID) {
    console.log('SERVICE! DELETING A PRODUCT!')
    return this._http.delete(`/api/products/${productID}`).map(data => data).toPromise();
  }

  oneProduct(productID) {
    console.log('SERVICE! GETTING ONE PRODUCT BY ID!')
    return this._http.get(`/api/products/${productID}`);
  }

  editProduct(productID, edProduct) {
    console.log('SERVICE! EDITING A PRODUCT!')
    return this._http.put(`/api/products/${productID}`, edProduct).map(data => data).toPromise();;
  }
}