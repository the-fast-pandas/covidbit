// Server - CovidBit - Fast Pandas
// Created:                2021, Valya Derksen
// Modified: 25, February, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-services/data.service';
import { AuthService } from '../services/auth-services/auth.service';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme'
import { AddCaseComponent } from './add-case/add-case.component';
import { TableCasesComponent } from './table-cases/table-cases.component';
import { EditCaseComponent } from './edit-case/edit-case.component';


// http://localhost:4200/business-dashboard/:6021f5ef579ec8fa794be159
interface Case {
  dateReported: string;
  status: string;
  gender: string;
  age: number;
  acquisition: string;
  items?: number;
}
interface TreeNode<T> {
  data: T;
}
@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
})

export class BusinessDashboardComponent implements OnInit {
  
  //Form Groups
  safetyMeasures: FormGroup = new FormGroup({});
  safetyMeasureList: any = [];
  caseReported: FormGroup = new FormGroup({});
  caseReportedList: FormGroup = new FormGroup({});
  private fb: FormBuilder = new FormBuilder();
  dateControl = new FormControl(new Date());

  // Business Profile Form Variables
  id: String = "";
  businessName: String = '';
  firstName: String = '';
  lastName: String = '';
  businessLocation: String = '';
  businessPhone: String = '';
  email: String = '';
  webSite: String = '';
  businessType: String = '';
  searchCheck: Boolean = false;
  displayList: Boolean = false;

  // Reported Case Form Variables
  case = {
    dateReported: '',
    status: '',
    gender: '',
    acquisition: '',
    age: 1,
  }

  // Acquisition options Array
  acquisitionType = [
    {name: 'Travel'},
    {name: 'Workplace Outbreak'},
    {name: 'Close Contact'},
    {name: 'Local Transmission'},
    {name: 'Institutional Outbreak'},
    {name: 'Unknown'},
  ];
  // Case Status options Array
  statusType = [
    {name: 'Under Investigation'},
    {name: 'Recovered'},
    {name: 'Self-Isolating'},
    {name: 'Hospitalized'},
    {name: 'Deceased'},
    {name: 'Hospitalized-ICU'},
  ];
  // Gender options Array
  genderType = [
    {name: 'Male'},
    {name: 'Female'},
    {name: 'Prefer not to say'},
  ];

  safetyMeasuresList = [
    {title: 'safety measures 1', description: 'safety measures 1'},
    {title: 'safety measures 2', description: 'safety measures 2'},
    {title: 'safety measures 3', description: 'safety measures 3'},
  ]
  
  constructor(public dataS: DataService, public router: Router, private activatedRoute: ActivatedRoute, public auth: AuthService) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataS.getUserView(id)
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
    });
    this.caseReported = new FormGroup({
      dateReported: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      acquisition: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(110) ]),
    });
  }

  // ADD Safety Measure
  onAddMeasure() {
    const safetyMeasure = {
      title: this.safetyMeasures.get('title')?.value,
      description: this.safetyMeasures.get('description')?.value
    }
    this.safetyMeasureList.push(safetyMeasure);
    this.auth.addSafety(safetyMeasure, this.id);
    this.safetyMeasures.get('title')?.reset();
    this.safetyMeasures.get('description')?.reset();
  }

  tabReset() {
    this.displayList = false;
    this.searchCheck = false;
  }

  // Table settings
  allColumns = [ 'dateReported', 'status', 'acquisition', 'gender', 'age'];

  data: TreeNode<Case>[] = [
    {
      data: { dateReported: 'Mar 13, 2021', status: 'Under Investigation', gender: 'Male',  age: 45, acquisition: 'Workplace Outbreak'},
    },
  ];
}