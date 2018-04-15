import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  ledger = [];
  balance = 0;
  value = 1;

  constructor(private _http: HttpClient) {
  }
  
  getValue() {
    return this.value;
  }
  getBalance() {
    return this.balance;
  }
  getLedger() {
    return this.ledger;
  }
  mineCoin() {
    var transaction = {action: "mine", amount: 1, value: this.value}
    this.ledger.push(transaction);
    this.balance +=1;
    this.value +=1;
    console.log("MINE LEDGER:", this.ledger);
    console.log("MINE BALANCE:", this.balance);
  }
  buyCoin(num) {
    var transaction = {action: "buy", amount: num, value: this.value}
    this.ledger.push(transaction);
    this.value += num;
    this.balance += num;
    console.log("BUY LEDGER:", this.ledger);
    console.log("BUY BALANCE:", this.balance);
  } 
  sellCoin(num) {
    let transaction = {action: "sell", amount: num, value: this.value}
    this.ledger.push(transaction);
    this.value -= num;
    this.balance -= num;
    console.log("SELL LEDGER:", this.ledger);
    console.log("SELL BALANCE", this.balance);
  }
}
// NOTES:
// INSTRUCTIONS UNCLEAR AS TO THE VALUE OF THE SHINTO COIN!!!!
// DO YOU WANT THE VALUE TO INCREMENT PER OVERALL PURCHASE OR PER COIN PURCHASED?????
// PFT!!!