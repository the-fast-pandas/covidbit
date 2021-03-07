// Server - CovidBit - Fast Pandas
// Created:                2021, John T
// Modified: 25, February, 2021, Teresa Costa: backend integration (constructor)


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-services/data.service';

@Component({
  selector: 'app-business-user-view',
  templateUrl: './business-user-view.component.html',
  styleUrls: ['./business-user-view.component.scss']
})
export class BusinessUserViewComponent implements OnInit {

  businessName: String = '';
  businessPhoneNumber: String = '';
  businessAddress: String = '';
  businessWebsite: String = '';
  businessType: String = '';

  safetyMeasureList: any = [];
  trackingMethod: boolean = false;
  totalCases: number = 0;
  totalCases30Days: number = 0;

  constructor(public dataService: DataService, public router: Router, private activatedRoute: ActivatedRoute) {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getUserView(id)
      .subscribe(
        data => {
          this.businessName = data.user.businessName;
          this.businessPhoneNumber = data.user.phoneNumber;
          this.businessAddress = data.user.location;
          this.businessWebsite = data.user.loginId;
          this.businessType = data.user.businessType;
        })
  }

  ngOnInit(): void {

    safetyMeasures: new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })

    const safetyMeasure = {
      title: "safety Measure #1",
      description: "safety Measure Description"
    }

    this.safetyMeasureList.push(safetyMeasure)

  }
}  