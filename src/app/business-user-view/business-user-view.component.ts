// Server - CovidBit - Fast Pandas
// Created:  20, February, 2021, John Turkson
// Modified: 25, February, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Local Service
import { DataService } from '../services/data-services/data.service';
import { SafetyMeasures } from '../models/schemas/safetyMeasures.model';
import { AdmService } from '../services/adm-services/adm.service';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-business-user-view',
  templateUrl: './business-user-view.component.html',
  styleUrls: ['./business-user-view.component.scss']
})
export class BusinessUserViewComponent implements OnInit {

  businessName: String = myGlobals.emptyField;
  businessPhoneNumber: String = myGlobals.emptyField;
  businessAddress: String = myGlobals.emptyField;
  businessWebsite: String = myGlobals.emptyField;
  businessType: String = myGlobals.emptyField;
  id: String = myGlobals.emptyField;

  safetyMeasureList: Array<SafetyMeasures> = [];
  safetyMeasure: SafetyMeasures = { title: myGlobals.emptyField, description: myGlobals.emptyField, confirmed: myGlobals.emptyField }
  totalCases: number = 0;
  totalCases30Days: number = 0;

  constructor(public data: DataService, public router: Router, private activatedRoute: ActivatedRoute, public adm: AdmService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || myGlobals.emptyField;
    this.data.getUserView(this.id)
      .subscribe(
        data => {
          this.businessName = data.user.businessName;
          this.businessPhoneNumber = data.user.phoneNumber;
          this.businessAddress = data.user.location;
          this.businessWebsite = data.user.loginId;
          this.businessType = data.user.businessType;
          this.adm.getUserCases({ name: data.user.businessName }).subscribe(caseData => {
            this.totalCases = caseData.cases.length;
          });
          this.data.getAllSafety().subscribe(
            safety => {
              this.getSafetyMeasures(safety);
            })
        })
  }

  ngOnInit(): void { }

  // Extracts all the User Safety Measures
  getSafetyMeasures(data: any) {
    for (let i = 0; i < Object.keys(data.safeties).length; i++) {
      if (this.id === data.safeties[i].businessId) {
        this.safetyMeasureList.push({
          title: data.safeties[i].title,
          description: data.safeties[i].description,
          confirmed: ""
        });
      }
    }
  }
}