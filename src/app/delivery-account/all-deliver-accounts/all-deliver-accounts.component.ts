import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryAccountService } from '../../service/delivery-account.service';

@Component({
  selector: 'app-all-deliver-accounts',
  templateUrl: './all-deliver-accounts.component.html',
  styleUrls: ['./all-deliver-accounts.component.css']
})
export class AllDeliverAccountsComponent implements OnInit {

  allDeliveryAccount = [];
  showOrHide = true;
  totalRecords: number;
  totalPages;
  showNextandPrev = false;

  constructor(private router: Router, public service: DeliveryAccountService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.getNumberOfPages();
    this.getDeliveryAccounts();
  }

  getDeliveryAccounts(){
    this.service.getAllDeliveryAccountsP().subscribe(
      (res: any) => {
        this.allDeliveryAccount = res.delivery;
        this.showOrHide = false;
        console.log(this.allDeliveryAccount);
      }
    );
  }


  getNumberOfPages() {
    // get all products in curent category
    this.service.getAllDeliveryAccountsP().subscribe(
     (count: any) => {
       this.totalRecords = count.delivery.length;

       // Build Pagination
       this.totalPages = this.totalRecords / 10;

       // Check Number of buttons that will be show to user
       if (this.totalPages < 1) {
         this.totalPages = 1;
       } else {
         this.totalPages = Math.ceil(this.totalPages);
       }

       // show or hide Next & Previous Button
       this.showNextandPrev = this.totalPages > 5 ? true : false;

     }
   );
 }


  // Pagination ==>
  // Generate Page numbers
  paginationGenerate(page: number) {
    var items: number[] = [];
    for(var i = 1; i <= page; i++){
      items.push(i);
    }
    return items;
  }

  getNextPage(pageNumber: number) {
    this.service.pageNumber = pageNumber;
    this.showOrHide = true;

    this.service.getAllDeliveryAccountsP().subscribe(
      (res: any) => {this.allDeliveryAccount = res.delivery; this.showOrHide = false;}
    );
  }

  goNext() {
    this.service.pageNumber += 1;
    this.showOrHide = true;

    this.service.getAllDeliveryAccountsP().subscribe(
      (res: any) => {this.allDeliveryAccount = res.delivery; this.showOrHide = false;}
    );
  }

  goPrev() {
    this.service.pageNumber -= 1;
    this.showOrHide = true;

    this.service.getAllDeliveryAccountsP().subscribe(
      (res: any) => {this.allDeliveryAccount = res.delivery; this.showOrHide = false;}
    );
  }

  createNewAccountDel(){
    this.router.navigate(['/deliveryAccount/create-delivery-account']);
  }

}
