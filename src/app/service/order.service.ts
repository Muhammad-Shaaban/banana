import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = 'https://banana-api-1.herokuapp.com/admin/orders';

  filterType = 'ended';
  arrived = 0;
  delivery = 0;
  cancel = 0;
  PayM = 'cash';

  pageNumber = 1;

  constructor(private http: HttpClient) { }

  getAllOrders(){
    // console.log(this.baseUrl + '?page=' + this.pageNumber + '&filter=' + this.filterType + '&bananaDelivery=' + this.delivery + '&arrived=' + this.arrived + '&cancel=' + this.cancel + '&payMethod=' + this.PayM);
    return this.http.get(this.baseUrl + '?page=' + this.pageNumber + '&filter=' + this.filterType + '&bananaDelivery=' + this.delivery + '&arrived=' + this.arrived + '&cancel=' + this.cancel + '&payMethod=' + this.PayM, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }

  singleOrder(id){
    return this.http.get( 'https://banana-api-1.herokuapp.com/admin/order/single/' + id, {headers: {Authorization: 'hh ' + localStorage.getItem('token')}});
  }
}
