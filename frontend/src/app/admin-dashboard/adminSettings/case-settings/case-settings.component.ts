// Server - CovidBit - Fast Pandas
// Created:  16, February, 2021, John Turkson
// Modified: 04, March, 2021, Teresa Costa: backend integration, global variables
//           20, March, 2021, John Turkson: improvements on backend/frontend integration
//           28, March, 2021, Teresa Costa: delete works

import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// Local Service
import { AdmService } from '../../../services/adm-services/adm.service';
// Models
import { BusinessName } from '../../../models/businessName.model';
import * as myGlobals from '../../../globals';

@Component({
  selector: 'app-case-settings',
  templateUrl: './case-settings.component.html',
  styleUrls: ['./case-settings.component.scss']
})
export class CaseSettingsComponent implements OnInit {

  //Gender Types
  genderArray = myGlobals.gender;
  statusList = myGlobals.statusCases;
  acquisitionList = myGlobals.acquisitionType;

  // Form instances
  caseResults: FormGroup = new FormGroup({});
  businessSearch: FormGroup = new FormGroup({});
  newCaseInformation: FormGroup = new FormGroup({});

  businessName: BusinessName = { name: '' };

  // Check boolean
  displayCaseList = false;
  searchCheck = false
  checked: Boolean = false;
  alertCaseRemoved: Boolean = false;
  alertCaseAdded: Boolean = false;

  foundBusinesses: Array<String> = [];
  foundBusinessCases: Array<any> = [];
  casesIDList: Array<String> = [];
  listOfBusinesses: Array<String> = [];

  constructor(private formBuilder: FormBuilder, public adm: AdmService) {
    this.caseResults = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.newCaseInformation = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      acquisition: new FormControl('', [Validators.required])
    })
    this.businessSearch = new FormGroup({
      searchedBusiness: new FormControl('', [Validators.required])
    });
    this.adm.getUserAdm(this.businessName).subscribe(//Fill Dropdown List with businesses from the Database
      data => {
        this.fillDropdownList(data);
      }
    );
  }

  addCase() {
    this.adm.addUserCasesAdm(this.newCaseInformation.value);
    this.alertCaseAdded = true;
    this.newCaseInformation.reset();
  }

  // (ngSubmit)
  searchForBusiness() {
    //Clear Arrays that hold information
    this.foundBusinessCases = [];
    this.casesIDList = [];
    this.businessName.name = this.businessSearch.get('searchedBusiness')?.value;
    this.adm.getUserCases(this.businessName).subscribe(
      data => {
        this.getCases(data)
        if (this.foundBusinessCases.length === 0) {
          this.searchCheck = true;
          this.displayCaseList = false;
        } else {
          this.displayCaseList = true;
          this.searchCheck = false;
        }
      }
    );
  }

  // (changeTab) handler
  tabReset() {
    this.displayCaseList = false;
    this.searchCheck = false;
    this.businessSearch.get('searchedBusiness')?.setValue('');
  }

  // (change) handler
  getCheckedValue(event: any) {
    const checkArray: FormArray = this.caseResults.get('checkArray') as FormArray;
    if (event.target.checked) {
      checkArray.push(new FormControl(event.target.value));
    } else {
      let index: number = 0;
      checkArray.controls.forEach(
        (item: AbstractControl) => {
          if (item.value == event.target.value) {
            checkArray.removeAt(index);
            return;
          }
          index++;
        });
    }
  }

  // (ngSubmit)
  removeCases() {
    let removeList = this.caseResults.value.checkArray;
    this.adm.deleteUserCasesAdm(removeList).subscribe(
      data => {
        this.alertCaseRemoved = true;
        this.businessSearch.reset();
        this.caseResults.reset();
        this.casesIDList = [];

      }
    );
  }

  // Called by ngOnInit()
  // Fills the dropdown for business users
  fillDropdownList(data: any) {
    for (let i = 0; i < data.users.length; i++) {
      this.listOfBusinesses.push(data.users[i].businessName);
    }
  }

  // Called by searchForBusiness()
  // Gets an id list for cases for a specific user
  getCases(data: any) {
    for (let i = 0; i < data.cases.length; i++) {
      if (data.cases[i] !== undefined) {
        if (data.cases[i].businessName == this.businessSearch.get('searchedBusiness')?.value) {
          this.foundBusinessCases.push(data.cases[i]);
          this.casesIDList.push(data.cases[i]._id);
        }
      }
    }
  }

  // Removes alert messages
  onClose() {
    this.alertCaseRemoved = false;
    this.alertCaseAdded = false;
  }

  toggle(checked: any) {
    this.casesIDList.push(checked.value);
  }
  getBusinesses(data: any) {
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data.myUsers[i].businessName == this.businessSearch.get('searchedBusiness')?.value) {
        this.foundBusinesses.push(data.myUsers[i].businessName);
        this.casesIDList.push(data.myUsers[i]._id);
      }

    }
  }
  convertToValue(key: string) {
    return this.caseResults.value[key].map((x: any, i: any) => !1)
  }
}