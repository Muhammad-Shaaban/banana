import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAccountService } from 'src/app/service/delivery-account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-delivery-account',
  templateUrl: './create-delivery-account.component.html',
  styleUrls: ['./create-delivery-account.component.css']
})
export class CreateDeliveryAccountComponent implements OnInit {

formData = {
  email: '',
  password: '',
  comfirmPassword: '',
  name: '',
  mobile: '',
  code: ''
};

  constructor(private router: Router, private service: DeliveryAccountService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
  }

  addNewDeliveyAccount(formData){
    this.service.createNewDeliveryAcc(formData.value).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.router.navigate(['/deliveryAccount/all-delievry-account']);
      }, (err: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title:  err.error.message,
          showConfirmButton: false,
          timer: 2000
        });


      }
    );
  }

}
