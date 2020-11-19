import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-notification',
  templateUrl: './client-notification.component.html',
  styleUrls: ['./client-notification.component.css']
})
export class ClientNotificationComponent implements OnInit {


  formData = {
    clientId: '',
    title_en: '',
    title_ar: '',
    title_urdu: '',
    body_en: '',
    body_ar: '',
    body_urdu: ''
  };

  clientid;

  constructor(private route: ActivatedRoute, private service: NotificationService) { }

  ngOnInit(): void {
    this.clientid = this.route.snapshot.paramMap.get('id');
  }

  sendNotifi(){
    this.formData.clientId = this.clientid;

    this.service.sendNotitfySeller(this.formData).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.formData = {
          clientId: this.clientid,
          title_en: '',
          title_ar: '',
          title_urdu: '',
          body_en: '',
          body_ar: '',
          body_urdu: ''
        };

      }
    );
  }

}
