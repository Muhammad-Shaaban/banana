import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyService } from 'src/app/service/money.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  showOrHide = true;
  allBananaDelivery;

  constructor(private service: MoneyService, private router: Router) { }

  ngOnInit(): void {
    this.getReloadedData();
  }

  getReloadedData(){
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.service.getBananaDelivery().subscribe(
      (res: any) => {
        this.allBananaDelivery = res;
        this.showOrHide = false;
      }
    );
  }


  updatePrice(){
    let msm = prompt('Enter The New Price of Delivey, please');

    let data = {
      price: msm.valueOf()
    };

    this.service.updateBananaDelivey(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.getReloadedData();
      }
    );
  }

}
