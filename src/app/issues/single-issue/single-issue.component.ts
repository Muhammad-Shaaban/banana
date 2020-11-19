import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from 'src/app/service/issue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-issue',
  templateUrl: './single-issue.component.html',
  styleUrls: ['./single-issue.component.css']
})
export class SingleIssueComponent implements OnInit {

  issueID;
  issueData;
  showOrHide = true;

  constructor(private service: IssueService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.issueID = this.route.snapshot.paramMap.get('id');

    this.service.getSingleIssue(this.issueID).subscribe(
      (res: any) => {
        this.issueData = res.data;
        this.showOrHide = false;
      }, err => {console.log(err); }
    );
  }

  approveIssue(issueID, price){
    let confirm = prompt('How much money do you want to refund');

    if (parseInt(confirm.valueOf()) <= 0 || parseInt(confirm.valueOf()) > price){

    } else {
      let data = {
        issueId: issueID,
        refund: parseInt(confirm.valueOf())
      };

      this.service.approveIssue(data).subscribe(
        (res: any) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 2000
          });
        }
      );
    }
  }

  disapproveIssue(issueID){
    let confirm = prompt('What is the reason of disapprvoed this Issue ?');

    let data = {
      issueId: issueID,
      reason: confirm.valueOf()
    };

    this.service.disapproveIssue(data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  moreInfoAboutVisa(id){
    this.router.navigate(['/money/visa-report/' + id]);
  }
}
