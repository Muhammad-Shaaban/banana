import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  baseUrl = 'https://banana-api-1.herokuapp.com/admin';

  constructor(private http: HttpClient) { }

  allPolicies(){
    return this.http.get(this.baseUrl + '/support/policy', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  postPolicy(data) {
    return this.http.post(this.baseUrl + '/support/policy', data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
