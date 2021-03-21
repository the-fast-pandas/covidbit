import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";

interface Student {
  title: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
}

interface Case {
  dateReported: string;
  status: string;
  gender: string;
  acquisition: string;
  age: number;
}

@Component({
  selector: 'app-edit-case',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss']
})
export class EditCaseComponent implements OnInit {

//Form Groups
caseReported: FormGroup = new FormGroup({});
dateControl = new FormControl(new Date());
form: FormGroup = new FormGroup({});
caseForm: FormGroup = new FormGroup({});


// Reported Case Form Variables
cases: Array<Case> = [
  { "dateReported": 'Feb 10, 2021', "status": 'Under Investigation', "gender": 'Male',  "age": 15, "acquisition": 'Travel'},
  { "dateReported": 'Mar 10, 2021', "status": 'Recovered', "gender": 'Female',  "age": 30, "acquisition": 'Close Contact'},
  { "dateReported": 'Mar 13, 2021', "status": 'Hospitalized', "gender": 'Prefer not to say',  "age": 45, "acquisition": 'Workplace Outbreak'},
]

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


constructor(private http: HttpClient, private fb: FormBuilder) {}

ngOnInit(): void {
    this.caseForm = this.fb.group({
      cases: this.fb.array(
        this.cases.map(obj=>
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
