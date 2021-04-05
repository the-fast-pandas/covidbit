import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { AdmService } from 'src/app/services/adm-services/adm.service';
import { BusinessName } from '../../models/businessName.model';
import {Cases} from '../../models/case.model';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss']
})
export class EditCaseComponent implements OnInit {

  // Acquisition options Array
  acquisitionType = myGlobals.acquisitionType;
  statusType = myGlobals.statusCases;
  genderType = myGlobals.gender;

  //Form Groups
  caseReported: FormGroup = new FormGroup({});
  dateControl = new FormControl(new Date());
  form: FormGroup = new FormGroup({});
  caseForm: FormGroup = new FormGroup({});

  businessName: BusinessName = { name: '' };
  newCase: Cases = { dateReported: 'Feb 10, 2021', status: "", gender: "", age: "", acquisition: ""};

  // Reported Case Form Variables
  cases: Array<Cases> = []

  constructor(private fb: FormBuilder, public adm: AdmService) { }

  ngOnInit(): void {
    this.businessName.name = localStorage.getItem('name_header') || myGlobals.emptyField;
    this.adm.getUserCases(this.businessName).subscribe(
      data => {
        this.getCases(data);
        this.caseForm = this.fb.group({
          cases: this.fb.array(
            this.cases.map(obj =>
              this.fb.group({
                dateReported: [obj.dateReported],
                status: [obj.status],
                acquisition: [obj.acquisition],
                gender: [obj.gender],
                age: [obj.age]
              })
            )
          )
        });
      }
    )
  }
  // Called by searchForBusiness()
  // Gets an id list for cases for a specific user
  getCases(data: any) {
    for (let i = 0; i < data.cases.length; i++) {
      if (data.cases[i] !== undefined) {
        if (data.cases[i].businessName ==  this.businessName.name) {
          this.newCase["status"] = data.cases[i].status;
          this.newCase["gender"] = data.cases[i].gender;
          this.newCase["age"] = data.cases[i].age;
          this.newCase["acquisition"] = data.cases[i].acquisition;
          this.newCase["dateReported"] = 'Feb 10, 2021';
          this.cases.push(this.newCase);
        }
      }
    }
  }

  // submit ADD Case
  onSubmit() {
    console.log("Form Value: ", this.caseForm.value);
  }

  getControls() {
    return (this.caseForm.get('cases') as FormArray).controls;
  }

  editCase(index: number) {
    console.log("Form Value: ", this.caseForm.value);
  }


}
