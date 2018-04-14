import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getChicagoDojo(){
  	console.log("IN THE HTTP SERVICE CHICAGO!")
  	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Chicago&APPID=f807c5ca4818d9e403ea91a1856a709f&units=imperial')
  }
  getSeattleDojo(){
  	console.log("IN THE HTTP SERVICE SEATTLE!")
  	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=f807c5ca4818d9e403ea91a1856a709f&units=imperial')
  }
  getSanjoseDojo(){
  	console.log("IN THE HTTP SERVICE SAN JOSE!")
  	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=San%20Jose&APPID=f807c5ca4818d9e403ea91a1856a709f&units=imperial')
  }
  getBurbankDojo(){
  	console.log("IN THE HTTP SERVICE BURBANK!")
  	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Burbank&APPID=f807c5ca4818d9e403ea91a1856a709f&units=imperial')
  }
  getDallasDojo(){
  	console.log("IN THE HTTP SERVICE DALLAS!")
  	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Dallas&APPID=f807c5ca4818d9e403ea91a1856a709f&units=imperial')
  }
  getWashingtonDojo(){
  	console.log("IN THE HTTP SERVICE WASHINGTON!")
  	return this._http.get('http://api.openweathermap.org/data/2.5/weather?q=Washington&APPID=f807c5ca4818d9e403ea91a1856a709f&units=imperial')
  }
}
