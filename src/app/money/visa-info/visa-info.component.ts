import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoneyService } from 'src/app/service/money.service';

@Component({
  selector: 'app-visa-info',
  templateUrl: './visa-info.component.html',
  styleUrls: ['./visa-info.component.css']
})
export class VisaInfoComponent implements OnInit {

  visaRportID;
  reportInfo;
  showOrHide = true;

  constructor(private service: MoneyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.visaRportID = this.route.snapshot.paramMap.get('id');

    this.service.getPaymentReport(this.visaRportID).subscribe(
      (res: any) => {
        this.reportInfo = res.data.body;
        this.showOrHide = false;
      }
    );
  }

}
