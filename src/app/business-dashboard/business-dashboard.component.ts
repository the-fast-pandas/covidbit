// Server - CovidBit - Fast Pandas
// Created:                2021, Valya Derksen
// Modified: 25, February, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-services/data.service';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
})
export class BusinessDashboardComponent implements OnInit {

  //Form Groups
  safetyMeasures: FormGroup = new FormGroup({});
  safetyMeasureList: any = [];

  // Form Variables
  id: String = "";
  businessName: String = 'What is your name?';
  firstName: String = 'James';
  lastName: String = 'Bond';
  businessLocation: String = 'Where are you?';
  businessPhone: String = 'Add a Phone';
  email: String = 'myemail@host.com.ca';
  webSite: String = 'to be added';
  businessType: String = 'Type of Business';

  // smart table settings
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

  constructor(public dataService: DataService, public router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getUserView(id)
      .subscribe(
        data => {
          this.id = data.user._id;
          this.businessName = data.user.businessName;
          this.firstName = data.user.firstName;
          this.lastName = data.user.lastName;
          this.businessPhone = data.user.phoneNumber;
          this.businessLocation = data.user.location;
          this.email = data.user.loginId;
          this.businessType = data.user.businessType;
          this.webSite = data.user.website;
          this.safetyMeasureList = data.user.safetyMeasures;
        })
  }

  ngOnInit(): void {
    this.safetyMeasures = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
  }

  onAddMeasure() {
    const safetyMeasure = {
      title: this.safetyMeasures.get('title')?.value,
      description: this.safetyMeasures.get('description')?.value
    }
    this.safetyMeasureList.push(safetyMeasure);
    this.authService.addSafety(safetyMeasure, this.id);
    this.safetyMeasures.get('title')?.reset();
    this.safetyMeasures.get('description')?.reset();
  }
}