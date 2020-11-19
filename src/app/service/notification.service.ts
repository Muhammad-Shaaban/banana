import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseUrl = 'https://banana-api-1.herokuapp.com/admin/notfications/sendAll';
  baseUrl2 = 'https://banana-api-1.herokuapp.com/admin/notfications';

  constructor(private http: HttpClient) { }

  sendNotification(formData){
    return this.http.post(this.baseUrl, formData, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  sendNotitfySeller(formData){
    return this.http.post(this.baseUrl2 + '/send/seller', formData, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
