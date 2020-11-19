import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-client',
  templateUrl: './single-client.component.html',
  styleUrls: ['./single-client.component.css']
})
export class SingleClientComponent implements OnInit {

  clientID;
  clientName;
  singleClient;
  showOrHide = true;

  constructor(private servcie: ClientService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.clientID = this.route.snapshot.paramMap.get('id');
    this.clientName = this.route.snapshot.paramMap.get('name');

    this.servcie.singleClient(this.clientID).subscribe(
      (res: any) => {
        this.singleClient = res;
        this.showOrHide = false;
       }
    );
  }

  sendNotifiy(id){
    this.router.navigate(['/clients/client-notification/' + this.clientID]);
  }

}
