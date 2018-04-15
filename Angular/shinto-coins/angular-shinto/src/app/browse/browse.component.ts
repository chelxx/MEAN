import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  ledger = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.browseLedger();
  }
  browseLedger() {
    var transaction = this._httpService.getLedger();
    this.ledger = transaction;
    console.log("LEDGER:", this.ledger);
  }
}
