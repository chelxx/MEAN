import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getNotes() {
    console.log('SERVICE! GETTING ALL NOTES!')
    return this._http.get('/api/notes').map(data => data).toPromise();
  }
  addNote(newNote) {
    console.log('SERVICE! CREATING A NOTE!')
    return this._http.post('/api/notes', newNote).map(data => data).toPromise();
  }
  deleteNote(noteid) {
    console.log('SERVICE! DELETING A NOTE!')
    return this._http.delete(`/api/notes/${noteid}`).map(data => data).toPromise();
  }
}
