import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  browseledger = [];
  transaction: any;
  shintoCoin = 0;
  shintoValue = 1;

  constructor(private _http: HttpClient) {
    this.transaction = { id: 0, action:"", numberCoins:0, valueCoins:0 }
  }
  newTransaction(method, num){
    this.transaction.id = Math.trunc(Math.random()*1000+1)
    this.transaction.action = method
    this.transaction.numberCoins = num
    this.transaction.valueCoins = this.shintoValue
    this.browseledger.push(this.transaction)
    this.transaction = { id: 0, action:"", numberCoins:0, valueCoins:0}
  }
}