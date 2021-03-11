import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Admin/login/login.component';
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
import { AllMoneyComponent } from './money/all-money/all-money.component';
import { DeliveryComponent } from './money/delivery/delivery.component';
import { NotificationComponent } from './notification/notification.component';
import { VisaInfoComponent } from './money/visa-info/visa-info.component';
import { SellerNotificationComponent } from './seller/seller-notification/seller-notification.component';
import { ClientNotificationComponent } from './clients/client-notification/client-notification.component';
import { DeliveryAccountComponent } from './delivery-account/delivery-account.component';
import { AllDeliverAccountsComponent } from './delivery-account/all-deliver-accounts/all-deliver-accounts.component';
import { CreateDeliveryAccountComponent } from './delivery-account/create-delivery-account/create-delivery-account.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent,
    children: [
      {path: 'allProducts', component: AllproductsComponent},
      {path: 'addProduct', component: AddproductComponent},
      {path: 'edit/:id', component: EditComponent}
  ]},

  {path: 'seller', component: SellerComponent,
    children: [
      {path: 'allSeller', component: AllSellersComponent},
      {path: 'singleSeller/:id', component: SinglesellerComponent},
      {path: 'seller-notification/:id', component: SellerNotificationComponent}
  ]},

  {path: 'certificate', component: CertificatesComponent,
    children: [
      {path: 'allCertificate', component: AllcertificatesComponent},
      {path: 'singleCertificate/:id', component: SingleCertificateComponent}
  ]},

  {path: 'clients', component: ClientsComponent,
    children: [
      {path: 'allClients', component: AllClientsComponent},
      {path: 'singleClient/:name/:id', component: SingleClientComponent},
      {path: 'client-notification/:id', component: ClientNotificationComponent}
  ]},

  {path: 'policy', component: PolicyComponent, pathMatch: 'full'},
  {path: 'conditions', component: ConditionsComponent, pathMatch: 'full'},

  {path: 'issues', component: IssuesComponent,
    children: [
      {path: 'all-issues', component: AllissuesComponent},
      {path: 'single-issue/:id', component: SingleIssueComponent},
      {path: 'add-issue-reason', component: AddIssueReasonComponent}
  ]},

  {path: 'orders', component: OrdersComponent,
    children: [
      {path: 'all-orders', component: AllordersComponent},
      {path: 'singleOrder/:id', component: SingleOrderComponent}
  ]},

  {path: 'money', component: MoneyComponent,
    children: [
      {path: 'all-money', component: AllMoneyComponent},
      {path: 'delivery', component: DeliveryComponent},
      {path: 'visa-report/:id', component: VisaInfoComponent}
  ]},

  {path: 'notification', component: NotificationComponent, pathMatch: 'full'},
  {path: 'deliveryAccount', component: DeliveryAccountComponent,
    children: [
      {path: 'all-delievry-account', component: AllDeliverAccountsComponent, pathMatch: 'full'},
      {path: 'create-delivery-account', component: CreateDeliveryAccountComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
