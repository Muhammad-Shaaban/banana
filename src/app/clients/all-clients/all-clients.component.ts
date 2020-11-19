import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements OnInit {

  allClientsInfo: any = [];
  showOrHide = true;

  totalRecords: number;
  totalPages;
  showNextandPrev = false;

  constructor(public service: ClientService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.getNumberOfPages();

    this.getAllClients();
  }

  getAllClients() {
    this.service.allClients().subscribe(
      (res: any) => {
        this.allClientsInfo = res.data as [];
        this.showOrHide = false;
      }
    );
  }

  getSingleClient(name, id) {
    this.router.navigate(['/clients/singleClient/' + name + '/' + id]);
  }

  blockUnblock(id) {
    let data = {
      clientId: id
    };

    this.service.blockORunBlockClient(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.getAllClients();
      },
      err => {console.log(err); }
    );
  }

  clientSearch(){
    this.showOrHide = true;

    this.service.searchClient().subscribe(
      (res: any) => {
        this.allClientsInfo = res.searchResulr as [];
        this.showOrHide = false;
      }
    );
  }


  getNumberOfPages() {
    // get all products in curent category
    this.service.searchClient().subscribe(
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

    this.service.searchClient().subscribe(
      (res: any) => {this.allClientsInfo = res.data.products; this.showOrHide = false;}
    );
  }

  goNext() {
    this.service.searchPageNumber += 1;
    this.showOrHide = true;

    this.service.searchClient().subscribe(
      (res: any) => {this.allClientsInfo = res.data.products; this.showOrHide = false;}
    );
  }

  goPrev() {
    this.service.searchPageNumber -= 1;
    this.showOrHide = true;

    this.service.searchClient().subscribe(
      (res: any) => {this.allClientsInfo = res.data.products; this.showOrHide = false;}
    );
  }

}
