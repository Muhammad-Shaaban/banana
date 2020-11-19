import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  formData = {
    path: '',
    title_ar: '',
    body_ar: '',
    body_urdu: '',
    title_en: '',
    title_urdu: '',
    body_en: ''
  };

  constructor(private service: NotificationService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
  }


  sendNotifi(form){
    this.service.sendNotification(form.value).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.formData = {
          path: '',
          title_ar: '',
          body_ar: '',
          title_en: '',
          body_en: '',
          title_urdu: '',
          body_urdu: ''
        };

      }
    );
  }

}
