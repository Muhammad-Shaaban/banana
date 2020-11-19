import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

  }

}
