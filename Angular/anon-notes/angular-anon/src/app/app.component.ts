import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  noteList: any;
  newNote: any;

  constructor(private _httpService: HttpService) {
    this.noteList = [];
    this.newNote = {text: ''};
  }
  
  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this._httpService.getNotes().then(data => {
      if(data['message'] =='Success!'){
        this.noteList = data['notes'];
        console.log(this.noteList)
      }
    })
  }

  addNote(): void {
    this._httpService.addNote(this.newNote).then(data => {
      if(data['message'] =='Success!'){
        this.newNote = { note: "" };
        this.getNotes();
      }
    })
  }

  deleteNote(noteid): void {
    this._httpService.deleteNote(noteid).then(data => {
      this.getNotes();
    })
  }
}