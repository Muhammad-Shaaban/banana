import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor( ){ }

  ngOnInit(): void {
  }

}
