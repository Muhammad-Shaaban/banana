import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  // Login Inputs
  formInputs = {
    email: '',
    password: ''
  };

  test = false;

  constructor(private service: AdminService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/main']);
    }
  }

  onSubmit(formData: NgForm){
    this.service.login(formData.value).subscribe(
      (res: any) => {
        this.toastr.success(res.message, 'Banana Dashboard');
        this.router.navigate(['/main']);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('Email', res.data.email);
        location.reload();
      },
      (err: any) => {
        if (err.status === 401) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 2000
          });
        }


      }
    );
  }

}
