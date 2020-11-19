import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  allOrders;
  showOrHide = true;
  totalRecords;
  totalPages;
  showNextandPrev = false;
  filterType;
  showOrHideFilter = false;

  constructor(public service: OrderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.getNumberOfPages();

    this.service.getAllOrders().subscribe(
      (res: any) => {
        this.allOrders = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  singleOrder(id){
    this.router.navigate(['/orders/singleOrder/' + id]);
  }

    // get Number of pages
    getNumberOfPages(){
      this.service.getAllOrders().subscribe(
        (res: any) => {
          this.totalRecords = res.total;

          this.totalPages = this.totalRecords / 10;

          if (this.totalPages < 1){
            this.totalPages = 1;
          } else {
            this.totalPages = Math.ceil(this.totalPages);
          }

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

  getNextPage(pageNumber: number){
    this.service.pageNumber = pageNumber;

    this.service.getAllOrders().subscribe(
      (res: any) => {
        this.allOrders = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  goNext() {
    this.service.pageNumber += 1;

    this.service.getAllOrders().subscribe(
      (res: any) => {
        this.allOrders = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  goPrev(){
    this.service.pageNumber -= 1;

    this.service.getAllOrders().subscribe(
      (res: any) => {
        this.allOrders = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  // start filtering
  selectChangeFilter(e){
    if (e.value === 'ended') {
      this.showOrHideFilter = false;
    } else {
      this.showOrHideFilter = true;
    }
  }

  submitFilter(formData){

    // Loading Buffer
    this.showOrHide = true;

    if (formData.value.arrived === true){
      formData.value.arrived = 1;
      formData.value.cancel = 0;
    } else if (formData.value.cancel === true) {
      formData.value.cancel = 1;
      formData.value.arrived = 0;
    }

    if (formData.value.delivery === true){
      formData.value.delivery = 1;
    }

    this.service.filterType = formData.value.filterType;
    this.service.arrived = formData.value.arrived;
    this.service.cancel = formData.value.cancel;
    this.service.delivery = formData.value.delivery;
    this.service.PayM = formData.value.PayM;

    this.service.getAllOrders().subscribe(
      (res: any) => {
        this.allOrders = res.data as [];
        this.showOrHide = false;

        this.getNumberOfPages();

        console.log(formData.value);
      }
    );
  }

}
