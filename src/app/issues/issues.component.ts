import { Component, OnInit } from '@angular/core';
import { IssueService } from '../service/issue.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  issues;

  constructor(private service: IssueService) { }

  ngOnInit(): void {

  }

}
