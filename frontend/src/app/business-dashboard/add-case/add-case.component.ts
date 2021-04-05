import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';

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

constructor() {}

ngOnInit(): void {
  this.caseReported = new FormGroup({
    dateReported: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    acquisition: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(110) ]),
  });
}

// submit ADD Case
onSubmit() {
  //this.authService.editProfile(this.caseReported.value, this.id);
  console.log("Form Value: ", this.caseReported.value);
}


}
