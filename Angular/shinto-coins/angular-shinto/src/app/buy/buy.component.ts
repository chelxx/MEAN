import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  answer: number;
  value = 0;
  balance = 0;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.balance = this._httpService.getBalance();
    this.value = this._httpService.getValue();
  }
  buyShintoCoin() {
    console.log("ANSWER:", this.answer)
    this._httpService.buyCoin(this.answer);
    this.balance = this._httpService.getBalance();
    this.value = this._httpService.getValue();
    this.answer;
  }
}