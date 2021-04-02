// Server - CovidBit - Fast Pandas
// Created: 25, March, 2021, Valya Derksen
// Modified: 01, April, 2021, Teresa Costa: backend integration

import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Local Services
import { DataService } from 'src/app/services/data-services/data.service';
import { SafetyMeasures } from '../../models/safetyMeasures.model';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  //Form Group
  reviewForm: FormGroup = new FormGroup({});
  dateControl = new FormControl(new Date());
  toggleFormControl = new FormControl();

  // Business Data
  businessName: String = myGlobals.emptyField;
  businessLocation: String = myGlobals.emptyField;
  id: String = myGlobals.emptyField;

  safetyMeasuresList: Array<SafetyMeasures> = [];
  safetyMeasure: SafetyMeasures = { title: myGlobals.emptyField, description: myGlobals.emptyField, confirmed: myGlobals.emptyField }

  constructor(public data: DataService, public router: Router, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || myGlobals.emptyField;
    this.data.getUserView(this.id).subscribe(
      data => {
        this.businessName = data.user.businessName;
        this.businessLocation = data.user.location;
        this.safetyMeasuresList = data.user.safetyMeasures;
      })
  }

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      visitDate: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      toggleFormControl: new FormControl()
    })
  }

  // should display page with thank you message?
  onSubmit() {
    this.data.addReview(this.reviewForm.value, this.id);
    this.router.navigate(['/reviewConfirmation']);
  }

  checked = false;
  toggle(checked) {
    checked = true;
    console.log(checked);
  }

  countConfirm(index: any) {
    let numberConfirmations = 0;
    if (this.safetyMeasuresList[index].confirmed !== undefined) {
      numberConfirmations = parseInt(this.safetyMeasuresList[index].confirmed.toString(), 10);
    }
    numberConfirmations = numberConfirmations + 1;
    this.safetyMeasuresList[index].confirmed = numberConfirmations.toString();
  }
}
