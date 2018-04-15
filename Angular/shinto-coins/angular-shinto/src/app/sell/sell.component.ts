import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  answer: number;
  value = 0;
  balance = 0;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.balance = this._httpService.getBalance();
    this.value = this._httpService.getValue();
  }
  sellShintoCoin() {
    console.log("ANSWER:", this.answer)
    this._httpService.sellCoin(this.answer);
    this.balance = this._httpService.getBalance();
    this.value = this._httpService.getValue();
    this.answer;
  }
}
