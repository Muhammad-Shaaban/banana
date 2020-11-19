import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './service/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BananaSystem';
  token = localStorage.getItem('token');
  email = localStorage.getItem('Email');
  direction;

  constructor(private router: Router, public translate: TranslateService, private service: OrderService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('lang'));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('Email');

    this.token = null;
    this.email = '';

    this.router.navigate(['/login']);

    location.reload();
  }

  switchLang(lang) {
    if (lang === 'ar') {
      this.direction = 'rlt';
    } else {
      this.direction = 'ltr';
    }

    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
