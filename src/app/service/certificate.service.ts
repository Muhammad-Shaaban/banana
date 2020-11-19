import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://banana-api-1.herokuapp.com/admin/seller';

  getAllCertificate() {
    return this.http.get(this.baseUrl + '/Certificates?page=1', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getSingleCertificate(id) {
    return this.http.get(this.baseUrl + '/single/Certificates/' + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  approveCertificate(Data){
    return this.http.post(this.baseUrl + '/Certificates/approve', Data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  unApproveCertificate(Data){
    return this.http.post(this.baseUrl + '/Certificates/disapprove', Data, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
