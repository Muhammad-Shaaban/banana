import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = 'https://api.bananas.ae/admin/login';

  constructor(private http: HttpClient) { }

  login(formData){
    return this.http.post(this.baseUrl, formData);
  }
}
