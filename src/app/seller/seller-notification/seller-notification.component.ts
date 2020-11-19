import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-notification',
  templateUrl: './seller-notification.component.html',
  styleUrls: ['./seller-notification.component.css']
})
export class SellerNotificationComponent implements OnInit {

  formData = {
    sellerId: '',
    title_en: '',
    title_ar: '',
    title_urdu: '',
    body_en: '',
    body_ar: '',
    body_urdu: ''
  };

  sellerID;

  constructor(private route: ActivatedRoute, private service: NotificationService) { }

  ngOnInit(): void {
    this.sellerID = this.route.snapshot.paramMap.get('id');
  }

  sendNotifi(){
    this.formData.sellerId = this.sellerID;

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
          sellerId: this.sellerID,
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
