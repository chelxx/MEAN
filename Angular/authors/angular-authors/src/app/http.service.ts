import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors() {
    console.log('SERVICE! GETTING ALL THE AUTHORS!')
    return this._http.get('/api/authors');
  }
  deleteAuthor(authorid) {
    console.log('SERVICE! DELETING AN AUTHOR!')
    return this._http.delete(`/api/author/${authorid}`).map(data => data).toPromise();
  }
  createAuthor(newAuthor) {
    console.log('SERVICE! CREATING AN AUTHOR!')
    return this._http.post('/api/author', newAuthor);
  }
  viewAuthor(authorid) {
    console.log('SERVICE! VIEWING AN AUTHOR!')
    return this._http.get(`/api/author/${authorid}`);
  }
  editAuthor(authorid, edAuthor) {
    console.log('SERVICE! EDITING AN AUTHOR!')
    return this._http.put(`/api/author/${authorid}`, edAuthor);
  }
  createQuote(authorid, newQuote) {
    console.log('SERVICE! CREATING A QUOTE!')
    return this._http.put(`/api/quote/${authorid}`, newQuote);
  }
  getAuthorQuotes(authorid) {
    console.log('SERVICE! GETTING ALL THE AUTHOR QUOTES!')
    return this._http.get(`/api/allquotes/${authorid}`);
  }
  deleteQuote(authorid, quoteid) {
    console.log('SERVICE! DELETING A QUOTE!')
    return this._http.delete(`/api/quote/${authorid}/${quoteid}`).map(data => data).toPromise();
  }
  getQuotes() {
    console.log('SERVICE! GETTING ALL THE QUOTES!')
    return this._http.get('/api/quotes');
  }
  voteUp(authorid, quoteid) {
    console.log('SERVICE! VOTING UP!')
    return this._http.put(`/api/voteup/${authorid}/${quoteid}`, {}).map(data => data).toPromise();
  }
  voteDown(authorid, quoteid) {
    console.log('SERVICE! VOTING DOWN!')
    return this._http.put(`/api/votedown/${authorid}/${quoteid}`, {}).map(data => data).toPromise();
  }
}