import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueService } from 'src/app/service/issue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-issue-reason',
  templateUrl: './add-issue-reason.component.html',
  styleUrls: ['./add-issue-reason.component.css']
})
export class AddIssueReasonComponent implements OnInit {

  formData = {
    EN: '',
    AR: '',
    urdu: ''
  };

  constructor(private router: Router, private service: IssueService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/login']);
    }
  }

  addNewIssueReason(formData){
    this.service.addIssueReasons(formData.value).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        });

        this.router.navigate(['/issues/issueReasons']);
      }, err => {console.log(err);}
    );
  }

}
