import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor( private _http: HttpClient ) {
    this.getPokemon();
    this.getCommonAbilities();
    this.getSharedAbilityUsers();
  }

  getPokemon(){
    let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbasaur.subscribe(data => {
      console.log("Bulbasaur in JSON:", data)
    })
  }
  getCommonAbilities(){
    let pokemonlist = this._http.get('https://pokeapi.co/api/v2/ability/34/');
    var ability = pokemonlist.subscribe(function (data) {
      console.log("There are", data["pokemon"].length, "pokemon with the same ability!")
      console.log("Common Ability Pokemon in JSON:", data);
      for(var i = 0; i < data["pokemon"].length; i++){
        console.log(data["pokemon"][i]["pokemon"]["name"]);
      }
    })
  }
  getSharedAbilityUsers(){
    let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    bulbasaur.subscribe(data => {
      for(var i = 0; i < data["abilities"].length; i++){
        var hipsterpokemon = data["abilities"][i].ability.url;
        console.log(hipsterpokemon);
        var hipster = this._http.get(hipsterpokemon);
        var abs = hipster.subscribe(function (data) 
        {
          console.log("There are", data["pokemon"].length ,"pokemon that share the", data["name"], "ability as Bulbasaur!");
        })
      }
    })
  }
}