import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoneyService } from '../../service/money.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-money',
  templateUrl: './all-money.component.html',
  styleUrls: ['./all-money.component.css']
})

export class AllMoneyComponent implements OnInit {

  allPulledMoney;
  showOrHide = true;
  totalRecords;
  totalPages;
  showNextandPrev = false;

  constructor(private router: Router, public service: MoneyService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.getNumberOfPages();

    this.getReloadesData();
  }

  getReloadesData(){
    this.service.getAllPulledMoney().subscribe(
      (res: any) => {
        this.allPulledMoney = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  acceptPulledMoney(id){
    let data = {
      requestId: id
    };

    this.service.acceptPull(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.getReloadesData();
      }
    );
  }

  refusePulledMoney(id){
    let mes = prompt('What is the reason of refused ?');

    let data = {
      requestId: id,
      adminNotes: mes.valueOf()
    };

    this.service.refusePull(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.getReloadesData();
      }
    );
  }


  // Pagimation
  paginationGenerate(page: number) {
    var items: number[] = [];
    for(var i = 1; i <= page; i++){
      items.push(i);
    }
    return items;
  }

  // get Number of pages
  getNumberOfPages(){
    this.service.getAllPulledMoney().subscribe(
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

  // Pagination Actions
  getNextPage(pageNumber: number){
    this.service.pageNumber = pageNumber;

    this.service.getAllPulledMoney().subscribe(
      (res: any) => {
        this.allPulledMoney = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  goNext() {
    this.service.pageNumber += 1;

    this.service.getAllPulledMoney().subscribe(
      (res: any) => {
        this.allPulledMoney = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  goPrev(){
    this.service.pageNumber -= 1;

    this.service.getAllPulledMoney().subscribe(
      (res: any) => {
        this.allPulledMoney = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  goToDelivery(){
    this.router.navigate(['/money/delivery']);
  }

}
