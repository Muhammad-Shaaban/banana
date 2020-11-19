import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  totalProds;
  totalIssues;
  totalOrderavilables;
  totalOrders;
  totalSeller;
  totalRev;

  showOrHide = true;

  constructor(private service: ProductsService, private router: Router) {}

  ngOnInit(): void {
    if (this.service.checkAuthIsExpires()) {
      this.router.navigate(['/login']);

    } else {

      this.service.getStatistecs().subscribe(
        (res: any) => {this.totalProds = res.data.totalProducts; }
      );
      this.service.getStatistecs().subscribe(
        (res: any) => {this.totalIssues = res.data.totalIssues; }
      );
      this.service.getStatistecs().subscribe(
        (res: any) => {this.totalOrderavilables = res.data.totalOrders_avilable; }
      );
      this.service.getStatistecs().subscribe(
        (res: any) => {this.totalOrders = res.data.totalOrders; }
      );
      this.service.getStatistecs().subscribe(
        (res: any) => {this.totalSeller = res.data.seller_not_avilable; }
      );
      this.service.getStatistecs().subscribe(
        (res: any) => {this.totalRev = res.data.totalRevinue; this.showOrHide = false;}

      );

    }
  }

}
