import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  weatherData: any
  constructor(private _httpService: HttpService) {
    this.weatherData = {humidity: 0, temp: 0, temp_min:0, temp_max:0, description:""}
  }
  ngOnInit() {
    
    this._httpService.getChicagoDojo().subscribe(data=>{
      this.weatherData.humidity = data['main']['humidity']
      this.weatherData.temp = data['main']['temp']
      this.weatherData.temp_min = data['main']['temp_min']
      this.weatherData.temp_max = data['main']['temp_max']
      this.weatherData.description = data['weather'][0]['description']
    })
  }
}