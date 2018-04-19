import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  banana = false;
  noteList: any;
  newNote: any;
  edNote: any;
  noteid;
  error;
  note;
  id;

  constructor(private _httpService: HttpService) {
    this.noteList = [];
    this.newNote = {note: ''};
    this.edNote = {note: ''};
  }
  
  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this._httpService.getNotes().then(data => {
      if(data['message'] == 'Success!'){
        this.noteList = data['notes'];
        console.log(this.noteList)
      }
    })
  }

  addNote(): void {
    this._httpService.addNote(this.newNote).then(data => {
      if(data['message'] == 'Success!'){
        this.newNote = { note: "" };
        this.getNotes();
      }
      else {
        console.log("APP! ADD NOTE ERROR!")
      }
    })
  }

  deleteNote(noteid): void {
    this._httpService.deleteNote(noteid).then(data => {
      this.getNotes();
    })
  }

  openEditForm(noteid) {
    this.banana = true;
    console.log("OPENING THE EDIT FORM!");
    this._httpService.getNoteByID(noteid).then(data => {
       this.edNote = data['note'];
       console.log("RESULT:", this.edNote.note, this.edNote._id)
    });
  }

  closeEditForm() {
    this.banana = false;
    console.log("CLOSING THE EDIT FORM!");
    
  }

  editNote(noteid): void {
    console.log(this.edNote)
    this._httpService.editNote(noteid, this.edNote).then(data => {
      if(data['message'] == 'Success!'){
        this.edNote = { note: "" };
        this.getNotes();
      }
      else {
        console.log("APP! EDIT NOTE ERROR!")
      }
    })
  }
}

// NOTES:
// YOU CAN CREATE A BLANK NOTE THE FIRST TIME BUT CANNOT CREATE ANOTHER BLANK NOT AFTER THAT
// FRONT END VALIDATIONS TF :(