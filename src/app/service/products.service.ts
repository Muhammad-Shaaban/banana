import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Filter
  filterdCategory = 'B';
  filteredProdcut;
  filteredProdcutParams = '';
  filterDate = 0;
  filterSold = 0;
  pageNumber = 1;

  baseUrl = 'https://banana-api-1.herokuapp.com/admin/products/';
  singleProdURL = 'https://banana-api-1.herokuapp.com/admin/product/single/';
  addProdURL = 'https://banana-api-1.herokuapp.com/admin/product';
  updateProdURL = 'https://banana-api-1.herokuapp.com/admin/product/edit';
  deleteProdURL = 'https://banana-api-1.herokuapp.com/admin/product/delete';
  helper = new JwtHelperService();



  constructor(private http: HttpClient) { }

//'?page=1&date=1&sold=1&filter[]=1&filter[]=2'
  getAllProducts(category){
    // tslint:disable-next-line:max-line-length
    // console.log('url : ', this.baseUrl + category + '?page=1&' + 'date=' + this.filterDate + '&sold=' + this.filterSold + '&' +  this.filteredProdcutParams);
    return this.http.get(this.baseUrl + category + '?page=1&' + 'date=' + this.filterDate + '&sold=' + this.filterSold + '&' +  this.filteredProdcutParams, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getProducts(categoryName) {
    return this.http.get(this.baseUrl + categoryName , {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getProductsPagination(categoryName) {
    return this.http.get(this.baseUrl + categoryName + '?page=' + this.pageNumber + '&' + 'date=' + this.filterDate + '&sold=' + this.filterSold + '&' +  this.filteredProdcutParams, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  getSingleProduct(id){
    return this.http.get(this.singleProdURL + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});

  }

  getStatistecs(){
    return this.http.get('https://banana-api-1.herokuapp.com/admin/home', {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  addProduct(formData) {
    return this.http.post(this.addProdURL, formData, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  updateProduct(formdata){
    return this.http.post(this.updateProdURL, formdata,  {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  deleteProdcut(id){
    return this.http.post(this.deleteProdURL, {productId: id}, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  checkAuthIsExpires() {
    const token = localStorage.getItem('token');
    if (this.helper.isTokenExpired(token)) {
      localStorage.removeItem('token');
      return true;
    } else {
      return false;
    }
  }
}
