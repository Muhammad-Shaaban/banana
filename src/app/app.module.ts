import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './Admin/login/login.component';
import { AdminService } from './service/admin.service';
import { ProductsComponent } from './products/products.component';
import { EditComponent } from './products/edit/edit.component';
import { AllproductsComponent } from './products/allproducts/allproducts.component';
import { AddproductComponent } from './products/addproduct/addproduct.component';
import { MainComponent } from './Admin/main/main.component';
import { SellerComponent } from './seller/seller.component';
import { SinglesellerComponent } from './seller/singleseller/singleseller.component';
import { AllSellersComponent } from './seller/all-sellers/all-sellers.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { AllcertificatesComponent } from './Certificates/allcertificates/allcertificates.component';
import { SellerService } from './service/seller.service';
import { ProductsService } from './service/products.service';
import { CertificateService } from './service/certificate.service';
import { SingleCertificateComponent } from './Certificates/single-certificate/single-certificate.component';
import { ClientsComponent } from './clients/clients.component';
import { AllClientsComponent } from './Clients/all-clients/all-clients.component';
import { SingleClientComponent } from './clients/single-client/single-client.component';
import { PolicyComponent } from './policy/policy.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { IssuesComponent } from './issues/issues.component';
import { AllissuesComponent } from './issues/allissues/allissues.component';
import { SingleIssueComponent } from './issues/single-issue/single-issue.component';
import { AddIssueReasonComponent } from './issues/add-issue-reason/add-issue-reason.component';
import { OrdersComponent } from './orders/orders.component';
import { AllordersComponent } from './orders/allorders/allorders.component';
import { SingleOrderComponent } from './orders/single-order/single-order.component';
import { MoneyComponent } from './money/money.component';
import { DeliveryComponent } from './money/delivery/delivery.component';
import { AllMoneyComponent } from './money/all-money/all-money.component';
import { NotificationComponent } from './notification/notification.component';
import { VisaInfoComponent } from './money/visa-info/visa-info.component';
import { SellerNotificationComponent } from './seller/seller-notification/seller-notification.component';
import { ClientNotificationComponent } from './clients/client-notification/client-notification.component';
import { DeliveryAccountComponent } from './delivery-account/delivery-account.component';
import { AllDeliverAccountsComponent } from './delivery-account/all-deliver-accounts/all-deliver-accounts.component';
import { CreateDeliveryAccountComponent } from './delivery-account/create-delivery-account/create-delivery-account.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ProductsComponent,
    EditComponent,
    AllproductsComponent,
    AddproductComponent,
    MainComponent,
    SellerComponent,
    SinglesellerComponent,
    AllSellersComponent,
    CertificatesComponent,
    AllcertificatesComponent,
    SingleCertificateComponent,
    ClientsComponent,
    AllClientsComponent,
    SingleClientComponent,
    PolicyComponent,
    ConditionsComponent,
    IssuesComponent,
    AllissuesComponent,
    SingleIssueComponent,
    AddIssueReasonComponent,
    OrdersComponent,
    AllordersComponent,
    SingleOrderComponent,
    MoneyComponent,
    DeliveryComponent,
    AllMoneyComponent,
    NotificationComponent,
    VisaInfoComponent,
    SellerNotificationComponent,
    ClientNotificationComponent,
    DeliveryAccountComponent,
    AllDeliverAccountsComponent,
    CreateDeliveryAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [AdminService, SellerService, ProductsService, CertificateService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
