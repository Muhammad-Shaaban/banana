import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.css']
})
export class SingleOrderComponent implements OnInit {

  orderID;
  orderInfo;
  selectedOfferInfo;
  paymentInfo;
  showOrHide = true;

  constructor(private route: ActivatedRoute, private service: OrderService) { }

  ngOnInit(): void {
    this.orderID = this.route.snapshot.paramMap.get('id');

    this.service.singleOrder(this.orderID).subscribe(
      (res: any) => {
        console.log(res);
        this.orderInfo = res.order;
        this.selectedOfferInfo = res.selectedOffer;
        this.paymentInfo = res.payMent;

        this.showOrHide = false;
      }
    );
  }

}
