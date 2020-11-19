import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from 'src/app/service/issue.service';

@Component({
  selector: 'app-allissues',
  templateUrl: './allissues.component.html',
  styleUrls: ['./allissues.component.css']
})
export class AllissuesComponent implements OnInit {


  issueReasonID;
  allIssues;
  allIssuesReasons;
  showOrHide = true;

  constructor(public service: IssueService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.service.getAllIssues().subscribe(
      (res: any) => {
        this.allIssues = res.data as [];
        this.showOrHide = false;
      }
    );

    this.service.getIssuesResons().subscribe(
      (res: any) => {
        this.allIssuesReasons = res.data as [];
      }
    );
  }

  getSingleIssue(id){
    this.router.navigate(['/issues/single-issue/' + id]);
  }

  addIssueReason(){
    this.router.navigate(['/issues/add-issue-reason']);
  }

  filterIssues(filterType, reason){
    this.service.filterType = filterType;
    this.service.reasonID = reason;

    this.showOrHide = true;

    this.service.getAllIssues().subscribe(
      (res: any) => {
        this.allIssues = res.data as [];
        this.showOrHide = false;
      }
    );
  }

}
