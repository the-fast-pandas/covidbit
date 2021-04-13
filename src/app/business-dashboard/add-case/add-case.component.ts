import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AdmService } from '../../services/adm-services/adm.service';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss']
})
export class AddCaseComponent implements OnInit {

  //Form Groups
  caseReported: FormGroup = new FormGroup({});
  dateControl = new FormControl(new Date());


  // Reported Case Form Variables
  case = {
    dateReported: '',
    status: '',
    gender: '',
    acquisition: '',
    age: 1,
  }

  //Gender Types
  genderType = myGlobals.gender;
  statusType = myGlobals.statusCases;
  acquisitionType = myGlobals.acquisitionType;

  constructor(public adm: AdmService) { }

  ngOnInit(): void {
    this.caseReported = new FormGroup({
      dateReported: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      acquisition: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(110)]),
    });
  }

  // submit ADD Case
  onSubmit() {
    this.adm.addUserCasesAdm(this.caseReported.value);
    console.log("Form Value: ", this.caseReported.value);
  }


}
