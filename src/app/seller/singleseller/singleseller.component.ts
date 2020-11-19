import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from 'src/app/service/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singleseller',
  templateUrl: './singleseller.component.html',
  styleUrls: ['./singleseller.component.css']
})
export class SinglesellerComponent implements OnInit {

  SellerID;
  sellerInfo;
  showOrHide = true;

  constructor(private route: ActivatedRoute, private service: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.SellerID = this.route.snapshot.paramMap.get('id');

    // Get Single Seller Info
    this.service.getSingleSeller(this.SellerID).subscribe(
      (res: any) => {
        this.sellerInfo = res;
        this.showOrHide = false;
      },
      err => {console.log(err); }
    );
  }

  sendNotifiy(id){
    this.router.navigate(['/seller/seller-notification/' + id]);
  }

}
