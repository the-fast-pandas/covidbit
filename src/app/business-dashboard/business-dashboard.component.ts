// Server - CovidBit - Fast Pandas
// Created:                2021, Valya Derksen
// Modified: 25, February, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
// Local Services
import { DataService } from '../services/data-services/data.service';
import { AuthService } from '../services/auth-services/auth.service';
import { SafetyMeasures } from '../models/safetyMeasures.model'
import * as myGlobals from '../globals';

@Component({
  selector: 'app-business-dashboard',
  templateUrl: './business-dashboard.component.html',
  styleUrls: ['./business-dashboard.component.scss'],
})

export class BusinessDashboardComponent implements OnInit {

  //Form Groups
  safetyMeasures: FormGroup = new FormGroup({});

  // Business Profile Form Variables
  businessName: String = myGlobals.emptyField;
  businessPhone: String = myGlobals.emptyField;
  businessAddress: String = myGlobals.emptyField;
  webSite: String = myGlobals.emptyField;
  businessType: String = myGlobals.emptyField;
  id: String = myGlobals.emptyField;
  firstName: String = myGlobals.emptyField;
  lastName: String = myGlobals.emptyField;
  businessLocation: String = myGlobals.emptyField;
  email: String = myGlobals.emptyField;
  certification: boolean = false;

  // Alert Control
  searchCheck: Boolean = false;
  displayList: Boolean = false;

  safetyMeasureList: Array<SafetyMeasures> = [];
  safetyMeasure: SafetyMeasures = { title: myGlobals.emptyField, description: myGlobals.emptyField, confirmed: myGlobals.emptyField }
  safetyIdList: Array<String> = [];
  itemsToRemove: Array<SafetyMeasures> = [];

  constructor(public dataS: DataService, public router: Router, private activatedRoute: ActivatedRoute, public auth: AuthService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || myGlobals.emptyField;
    this.dataS.getUserView(this.id).subscribe(
      user => {
        this.id = user.user._id;
        this.businessName = user.user.businessName;
        this.firstName = user.user.firstName;
        this.lastName = user.user.lastName;
        this.businessPhone = user.user.phoneNumber;
        this.businessLocation = user.user.location;
        this.email = user.user.loginId;
        this.businessType = user.user.businessType;
        this.webSite = user.user.website;
        this.certification = user.user.certification;
        this.dataS.getAllSafety().subscribe(
          safety => {
            this.getSafety(safety);
          })
      })
  }

  ngOnInit(): void {
    this.safetyMeasures = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  getSafety(data: any) {
    for (let i = 0; i < Object.keys(data.safeties).length; i++) {
      if (this.id === data.safeties[i].businessId) {
        this.safetyMeasure["title"] = data.safeties[i].title;
        this.safetyMeasure["description"] = data.safeties[i].title;
        this.safetyMeasureList.push(this.safetyMeasure);
        this.safetyIdList.push(data.safeties[i]._id);
      }
    }
  }

  // ADD Safety Measure
  onAddMeasure() {
    let safetyMeasure = {} as SafetyMeasures;

    safetyMeasure.title = this.safetyMeasures.get('title')?.value;
    safetyMeasure.description = this.safetyMeasures.get('description')?.value;

    this.safetyMeasureList.push(safetyMeasure);
    console.log(this.safetyMeasureList);
    // this.auth.addSafety(safetyMeasure, this.id);
    this.safetyMeasures.get('title')?.reset();
    this.safetyMeasures.get('description')?.reset();
  }


  selectedItems(index: any) {
    let obj = this.safetyMeasureList[index];
    this.itemsToRemove.push(obj);
  }

  // DELETE Safety Measure
  onDeleteMeasure() {
    for (let i = 0; i < this.safetyMeasureList.length; i++) {
      for (let x = 0; x < this.itemsToRemove.length; x++) {
        if (this.itemsToRemove[x] !== undefined) {
          if (this.itemsToRemove[x].title === this.safetyMeasureList[i].title &&
            this.itemsToRemove[x].description === this.safetyMeasureList[i].description) {
            this.auth.deleteSafety(this.safetyIdList[i]).subscribe(
              data => { this.safetyMeasureList.splice(i, 1); }
            )
          }
        }
      }
    }
  }

  tabReset() {
    this.displayList = false;
    this.searchCheck = false;
  }

}