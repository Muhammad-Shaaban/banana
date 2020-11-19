import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { NgForOf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {

  formData = {
    productId: '',
    nameEn: '',
    nameAr: '',
    name_urdu: '',
    productType: '',
    category: '',
    image: ''
  };

  productId;
  imageUrl;

  constructor(private route: ActivatedRoute, private service: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');

    this.service.getSingleProduct(this.productId).subscribe(
      (res: any) => {
        this.formData.productId = res.data._id;
        this.formData.nameEn = res.data.name_en;
        this.formData.nameAr = res.data.name_ar;
        this.formData.name_urdu = res.data.name_urdu;
        this.formData.productType = res.data.productType;
        this.formData.category = res.data.category;
        this.formData.image = res.data.imageUrl;
      },
      err => {}
    );
  }

  updateImage(event){
    this.imageUrl = event.target.files[0];
  }

  update(){
    const form = new FormData();
    form.append('productId', this.formData.productId);
    form.append('nameEn', this.formData.nameEn);
    form.append('nameAr', this.formData.nameAr);
    form.append('name_urdu', this.formData.name_urdu);
    form.append('productType', this.formData.productType);
    form.append('category', this.formData.category);
    form.append('image', this.imageUrl);

     // Reset FilteredCategory Value to back to all products of edited category
    this.service.filterdCategory = this.formData.category;

    // Reset FilteredCategory Value to back to all products of edited category
    this.service.filterdCategory = this.formData.category;

    this.service.updateProduct(form).subscribe(
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
      }
    );
  }
}
