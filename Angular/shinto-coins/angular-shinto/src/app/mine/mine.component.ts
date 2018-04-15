import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  answer: number;
  result = "";

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }
  mineShintoCoin(): void {
    console.log("ANSWER:", this.answer)
    if (this.answer == 13) {
      this._httpService.mineCoin();
      this.result = "Correct! You gained ONE Shinto Coin!"
      console.log("Correct! You gained ONE Shinto Coin!");
    } 
    else {
      this.result = "Incorrect! Go back to the mines!"
      console.log("Incorrect! Go back to the mines!")
    }
  }
}
