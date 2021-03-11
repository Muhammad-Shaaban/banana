import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConditionService {

  baseUrl = 'https://api.bananas.ae/admin';

  constructor(private http: HttpClient) { }

  getConditions(){
    return this.http.get(this.baseUrl + '/support/conditions', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  postCondition(data){
    return this.http.post(this.baseUrl + '/support/conditions', data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
