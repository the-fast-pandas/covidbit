// Server - CovidBit - Fast Pandas
// Created:                2021, Valya Derksen
// Modified: 25, February, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup,FormBuilder } from '@angular/forms'
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
  caseReported: FormGroup = new FormGroup({});
  caseReportedList: FormGroup = new FormGroup({});
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

  safetyMeasuresList = []
  
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

  itemsToRemove: any = [];
  selectedItems(i){
    let obj = this.safetyMeasuresList[i];
    this.itemsToRemove.push(obj);
    console.log(this.itemsToRemove);
  }
  // DELETE Safety Measure
  onDeleteMeasure(){
    for (let i = 0 ; i<this.safetyMeasureList.length; i++){
      for (let x=0; x<this.selectedItems.length; x++){
        if(this.selectedItems[x]===this.safetyMeasureList[i]){
          this.safetyMeasureList.splice(i,1);
        }
      }
    } console.log(this.safetyMeasureList);
  }


  tabReset() {
    this.displayList = false;
    this.searchCheck = false;
  }

}