import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CertificateService } from 'src/app/service/certificate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-certificate',
  templateUrl: './single-certificate.component.html',
  styleUrls: ['./single-certificate.component.css']
})
export class SingleCertificateComponent implements OnInit {

  certificateID;
  certificateInfo;
  showOrHide = true;

  constructor(private route: ActivatedRoute, private service: CertificateService) { }

  ngOnInit(): void {
    this.certificateID = this.route.snapshot.paramMap.get('id');

    this.service.getSingleCertificate(this.certificateID).subscribe(
      (res: any) => {
        this.certificateInfo = res.data as object;
        this.showOrHide = false;
      },
      err => {}
    );
  }

  approve(id){
    let data = {
      sellerId: id
    };

    this.service.approveCertificate(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  disApprove(id){
    let txt = prompt('Reason for disapproved this certificate ?');
    let data = {
      sellerId: id,
      adminNote: txt.valueOf()
    };

    this.service.unApproveCertificate(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

}
