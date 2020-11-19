import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html'
})
export class AddproductComponent implements OnInit {

  formData = {
    nameEn: '',
    nameAr: '',
    nameUrdu: '',
    productType: '',
    category: '',
    image: ''
  };

  imageUrl;

  constructor(private service: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }


  uploadFile(event){
    this.imageUrl = event.target.files[0];
  }


  addNewProduct(){
    const form = new FormData();
    form.append('nameEn', this.formData.nameEn);
    form.append('nameAr', this.formData.nameAr);
    form.append('name_urdu', this.formData.nameUrdu);
    form.append('productType', this.formData.productType);
    form.append('category', this.formData.category);
    form.append('image', this.imageUrl);

    this.service.addProduct(form).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/products/allProducts']);
      },
      err => {
        console.log(err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'All Inputs are Required',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

}
