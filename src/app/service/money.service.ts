import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  baseUrl = 'https://api.bananas.ae/admin/pull/requests';
  baseUrl2 = 'https://api.bananas.ae/admin/bananaDelivery';

  pageNumber = 1;

  constructor(private http: HttpClient) { }

  getAllPulledMoney(){
    return this.http.get(this.baseUrl + '?page=' + this.pageNumber + '&filter=binding', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  acceptPull(formData){
    return this.http.post(this.baseUrl + '/accept', formData, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  refusePull(formData){
    return this.http.post(this.baseUrl + '/refuse', formData, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getBananaDelivery(){
    return this.http.get(this.baseUrl2, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  updateBananaDelivey(formData){
    return this.http.post(this.baseUrl2 + '/update', formData, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getPaymentReport(id){
    return this.http.get('https://api.bananas.ae/admin/pay/report/' + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}})
  }
}
