import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'https://banana-api-1.herokuapp.com/admin';
  searchPageNumber = 1;
  searchQuery = '';

  constructor(private http: HttpClient) { }

  allClients() {
    return this.http.get(this.baseUrl + '/clients?page=1&filter=0', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  singleClient(id) {
    return this.http.get(this.baseUrl + '/client/single/' + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  blockORunBlockClient(id) {
    return this.http.post(this.baseUrl + '/client/block/unblock', id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  searchClient(){
    return this.http.get(this.baseUrl + '/user/search?search=' + this.searchQuery + '&type=client&page=' + this.searchPageNumber, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
