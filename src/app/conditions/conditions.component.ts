import { Component, OnInit } from '@angular/core';
import { ConditionService } from '../service/condition.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css']
})
export class ConditionsComponent implements OnInit {

  formInputs = {
    EN: '',
    AR: '',
    urdu: ''
  };

  constructor(public service: ConditionService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }

    this.service.getConditions().subscribe(
      (res: any) => {
        this.formInputs.EN = res.conditions.EN;
        this.formInputs.AR = res.conditions.AR;
        this.formInputs.urdu = res.conditions.urdu;
      }
    );
  }

  addOrEditCondition() {
    this.service.postCondition(this.formInputs).subscribe(
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
