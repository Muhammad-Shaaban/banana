import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html'
})
export class AllproductsComponent implements OnInit {

  allProducts = [];

  allProductType = [
    {name: 'Fruits', value: 1},
    {name: 'Vegetables', value: 2},
    {name: 'Bread', value: 3},
    {name: 'Sandwiches', value: 4},
    {name: 'Pies', value: 5},
    {name: 'Croissant', value: 6},
    {name: 'Commodity', value: 7},
    {name: 'Frozen', value: 8},
    {name: 'Refrigerated', value: 9},
    {name: 'Canned', value: 10},
    {name: 'Goodies and Sweets', value: 11},
    {name: 'Animal products', value: 12},
    {name: 'Fish products', value: 13},
  ];

  form: FormGroup;
  productForm: FormGroup;
  isChecked = false;
  totalRecords: number;
  totalPages;
  showNextandPrev = false;

  // CheckBoxes
  checkboxesDataList: [];
  checkedIDs = [];

  showOrHide = true;

  constructor(public service: ProductsService, private router: Router, private fb: FormBuilder, private productFb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    });

    this.productForm = this.productFb.group({
      productArray: this.productFb.array([])
    });
  }

  ngOnInit(): void {

    // Check JWT Expire
    this.service.checkAuthIsExpires();

    if (localStorage.getItem('token') == null){
      this.router.navigate(['/login']);
    }

    this.getNumberOfPages();

    this.service.getProductsPagination(this.service.filterdCategory).subscribe(
      (res: any) => {this.allProducts = res.data.products; this.showOrHide = false ;}
    );
  }

  // بنخزن كل ال checkboxes اللي اخترنها في مصفوفه
  onCheckboxChange(event){
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (event.target.checked){
      checkArray.push(new FormControl(event.target.value));
    }

    else{
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;

      });
    }
  }

  //
  onProductTypeCheckBoxChabge(event) {
    const productArray: FormArray = this.productForm.get('productArray') as FormArray;

    if (event.target.checked){
      productArray.push(new FormControl(event.target.value));
    }

    else{
      let i = 0;
      productArray.controls.forEach((item: FormControl) => {
        if (item.value === event.target.value) {
          productArray.removeAt(i);
          return;
        }
        i++;

      });
    }

    this.service.filteredProdcut = this.productForm.value.productArray;

    // Get Filter Query Parameters
    let filterQuery = '';
    for (let item of this.service.filteredProdcut) {
      filterQuery += 'filter[]=' + item + '&';
    }

    this.service.filteredProdcutParams = filterQuery.slice(0, filterQuery.length - 1);
  }


  onSoldfilterChange(event){
    if (event.target.checked === true) {
      this.service.filterSold = 1;
    } else {
      this.service.filterSold = 0;
    }
  }

  onDatefilterChange(event) {
    if (event.target.checked === true) {
      this.service.filterDate = 1;
    } else {
      this.service.filterDate = 0;
    }
  }


  // حذف كل المنتجات اللي اخترها ال مستخدم
  deleteProdcut() {
    this.service.deleteProdcut(this.form.value.checkArray).subscribe(
    (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.service.getProductsPagination(this.service.filterdCategory).subscribe(
          (res2: any) => {
            const formArrayReset: FormArray = this.form.get('checkArray') as FormArray;
            formArrayReset.clear();
            this.allProducts = res2.data.products;
          }
        );
      },
      (err: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'First Select Record to Deleted',
          showConfirmButton: false,
          timer: 2000
        });

        console.log(err);
      }
    );
  }


  // Get Number of Page
  getNumberOfPages() {
    // get all products in curent category
    this.service.getProducts(this.service.filterdCategory).subscribe(
     (count: any) => {
       this.totalRecords = count.totalProducts;

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


  filter() {
    this.showOrHide = true;

    this.service.getAllProducts(this.service.filterdCategory).subscribe(
      (res: any) => {
        this.checkboxesDataList = res.data.products as [];
        this.allProducts = res.data.products;
        this.getNumberOfPages();
        this.showOrHide = false;
      },
      err => {
        console.log(err);
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

    this.service.getProductsPagination(this.service.filterdCategory).subscribe(
      (res: any) => {this.allProducts = res.data.products; }
    );
  }

  goNext() {
    this.service.pageNumber += 1;
    this.service.getProductsPagination(this.service.filterdCategory).subscribe(
      (res: any) => {this.allProducts = res.data.products; }
    );
  }

  goPrev() {
    this.service.pageNumber -= 1;
    this.service.getProductsPagination(this.service.filterdCategory).subscribe(
      (res: any) => {this.allProducts = res.data.products; }
    );
  }

}
