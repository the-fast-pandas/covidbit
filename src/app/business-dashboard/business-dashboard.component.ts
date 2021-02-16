import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss']
})
export class BusinessDashboardComponent implements OnInit {

  checked: Boolean = false;

  toggle(checked: boolean) {
    this.checked = checked;
  }





  constructor() { }

  ngOnInit(): void {
  }

}
