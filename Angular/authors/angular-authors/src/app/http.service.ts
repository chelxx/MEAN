import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors() {
    console.log('SERVICE! GETTING ALL THE AUTHORS!')
    return this._http.get('/authors');
  }
  deleteAuthor(authorid) {
    console.log('SERVICE! DELETING AN AUTHOR!')
    return this._http.delete(`/author/${authorid}`);
  }
  createAuthor(newAuthor) {
    console.log('SERVICE! CREATING AN AUTHOR!')
    return this._http.post('/author', newAuthor);
  }
  viewAuthor(authorid) {
    console.log('SERVICE! VIEWING AN AUTHOR!')
    return this._http.get(`/author/${authorid}`);
  }
  editAuthor(authorid, edAuthor) {
    console.log('SERVICE! EDITING AN AUTHOR!')
    return this._http.put(`/author/${authorid}`, edAuthor);
  }
}
// NOTES:
// HOW TO MAKE SO THAT WHEN A FUNCTION IS DONE RUNNING, IT REDIRECTS TO THE HOME PAGE
// SOMETHING WEIRD HAPPENS WHEN YOU ADD SPECIAL CHARS IN NAME
// BACKEND VALIDATIONS SEEM TO BE FULL OF SHIT. FIX THAT.