import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
})
export class BusinessDashboardComponent implements OnInit {

  checked: Boolean = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }

  settings = {
    columns: {
      caseCount: {
        title: 'ID'
      },
      dateReported: {
        title: 'Date of case'
      },
      status: {
        title: 'Case Status'
      },
      gender: {
        title: 'Gender of person'
      }, 
      age: {
        title: 'Age of person'
      }
    }
  };

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    //this.authService.getUserDashboard();
  }

}
