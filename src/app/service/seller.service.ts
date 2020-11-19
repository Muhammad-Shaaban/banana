import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  baseUrl = 'https://banana-api-1.herokuapp.com/admin/sellers';
  baseUrl2 = 'https://banana-api-1.herokuapp.com/admin/seller';

  searchPageNumber = 1;
  searchQuery = '';

  constructor(private http: HttpClient) { }

  getAllSellers() {
    return this.http.get(this.baseUrl + '?page=1&filter=0', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getSingleSeller(id){
    return this.http.get(this.baseUrl2 + '/single/' + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  blockUnBlockSeller(id){
    return this.http.post(this.baseUrl2 + '/block/unblock', id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  searchSeller(){
    return this.http.get('https://banana-api-1.herokuapp.com/admin/user/search?search=' + this.searchQuery + '&type=seller&page=' + this.searchPageNumber, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
