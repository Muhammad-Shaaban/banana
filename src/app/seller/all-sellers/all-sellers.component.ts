import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/service/seller.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-sellers',
  templateUrl: './all-sellers.component.html',
  styleUrls: ['./all-sellers.component.css']
})
export class AllSellersComponent implements OnInit {

  sellers: any = [];
  showOrHide = true;

  totalRecords: number;
  totalPages;
  showNextandPrev = false;

  constructor(private router: Router, public service: SellerService) { }

  ngOnInit(): void {
   if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.getNumberOfPages();
    this.allSellers();
  }

  allSellers() {
     // Get
     this.service.getAllSellers().subscribe(
      (res: any) => {
        for (let i = 0; i < res.data.length; i++) {
          this.sellers.push(res.data[i]);
          this.showOrHide = false;
        }
      },
      err => {}
    );
  }


  BlockorUnBlock(sellerID) {
    let data = {
      sellerId: sellerID
    };

    this.service.blockUnBlockSeller(data).subscribe(
      (res: any ) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.sellers = [];
        this.allSellers();
      },
      (err: any) => {console.log(err)}
    );
  }

  sellerInfo(id) {
    this.router.navigate(['/seller/singleSeller/' + id]);
  }


  sellerSearch(){
    this.showOrHide = true;

    this.service.searchSeller().subscribe(
      (res: any) => {
        this.sellers = res.searchResulr as [];
        this.showOrHide = false;
      }
    );
  }


  getNumberOfPages() {
    // get all products in curent category
    this.service.searchSeller().subscribe(
     (count: any) => {
       this.totalRecords = count.totalItems;

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
    this.service.searchPageNumber = pageNumber;
    this.showOrHide = true;

    this.service.searchSeller().subscribe(
      (res: any) => {this.sellers = res.data.products; this.showOrHide = false;}
    );
  }

  goNext() {
    this.service.searchPageNumber += 1;
    this.showOrHide = true;

    this.service.searchSeller().subscribe(
      (res: any) => {this.sellers = res.data.products; this.showOrHide = false;}
    );
  }

  goPrev() {
    this.service.searchPageNumber -= 1;
    this.showOrHide = true;

    this.service.searchSeller().subscribe(
      (res: any) => {this.sellers = res.data.products; this.showOrHide = false;}
    );
  }

}
