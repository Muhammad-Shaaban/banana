import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  baseUrl = 'https://api.bananas.ae/admin/support/issues';
  filterType = 'ok';
  reasonID = '';

  constructor(private http: HttpClient) { }

  getIssuesResons(){
    return this.http.get(this.baseUrl + '/reasons', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getAllIssues(){
    console.log(this.baseUrl + '?filter=' + this.filterType +'&reason=' + this.reasonID);
    return this.http.get(this.baseUrl + '?filter=' + this.filterType +'&reason=' + this.reasonID, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getSingleIssue(id){
    return this.http.get(this.baseUrl + '/single/' + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  addIssueReasons(data){
    return this.http.post(this.baseUrl + '/reasons', data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  approveIssue(data){
    return this.http.post(this.baseUrl + '/approve', data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  disapproveIssue(data){
    return this.http.post(this.baseUrl + '/Disapprove', data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
