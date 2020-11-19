import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../service/policy.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  formInputs = {
    EN: '',
    AR: '',
    urdu: ''
  };

  constructor(public service: PolicyService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.service.allPolicies().subscribe(
      (res: any) => {
        this.formInputs.EN = res.policy.EN;
        this.formInputs.AR = res.policy.AR;
        this.formInputs.urdu = res.policy.urdu;
      }
    );
  }


  addOrEditPolicy() {
    this.service.postPolicy(this.formInputs).subscribe(
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
