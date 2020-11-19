import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/service/certificate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allcertificates',
  templateUrl: './allcertificates.component.html',
  styleUrls: ['./allcertificates.component.css']
})
export class AllcertificatesComponent implements OnInit {

  certificates: any = [];
  showOrHide = true;

  constructor(private service: CertificateService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.allCertifictes();
  }

  allCertifictes() {
    // Get
    this.service.getAllCertificate().subscribe(
     (res: any) => {
       for (let i = 0; i < res.data.length; i++) {
         this.certificates.push(res.data[i]);
       }

       this.showOrHide = false;
     },
     err => {}
   );
 }


  getSingleCertificate(id){
    this.router.navigate(['/certificate/singleCertificate/' + id]);
  }



}
