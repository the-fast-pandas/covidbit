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
  Cases: Array<Case> = [
    {dateReported: 'Mar 11, 2021', status: 'Under Investigation', gender: 'Male',  age: 45, acquisition: 'Workplace Outbreak'},
    {dateReported: 'Mar 12, 2021', status: 'Recovered', gender: 'Female',  age: 35, acquisition: 'Travel'},
    {dateReported: 'Mar 13, 2021', status: 'Self-Isolating', gender: 'Female',  age: 65, acquisition: 'Close Contact'},
  ];


  //Form Groups
  safetyMeasures: FormGroup = new FormGroup({});
  safetyMeasureList: any = [];
  caseReported: FormGroup = new FormGroup({});
  caseReportedList: FormGroup = new FormGroup({});
  private fb: FormBuilder = new FormBuilder();
  dateControl = new FormControl(new Date());

  editable: boolean = false;

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
    });
    this.caseReported = new FormGroup({
      dateReported: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      acquisition: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(110) ]),
    });
    this.caseReportedList = this.fb.group({
      Cases: this.fb.array(
        this.Cases.map(obj => 
          this.fb.group({
            dateReported: [obj.dateReported],
            status: [obj.status],
            acquisition: [obj.acquisition],
            gender: [obj.gender],
            age: [obj.age],
          })
          )
        )
    });
  }

  // ADD Safety Measure
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

  // submit ADD Case
  onSubmit() {
    //this.authService.editProfile(this.caseReported.value, this.id);
    console.log("Form Value: ", this.caseReported.value);
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