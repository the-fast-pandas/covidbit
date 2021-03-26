import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  // Business dummy data
  businessName: String = 'Pizza-Pizza';
  businessLocation: String = '68 Wellesley St E, Toronto, ON M4Y 1H2';
  safetyMeasuresList = [
    {title: 'safety measures 1', description: 'safety measures 1', confirmed: 0},
    {title: 'safety measures 2', description: 'safety measures 2', confirmed: 0},
    {title: 'safety measures 3', description: 'safety measures 3', confirmed: 0},
  ]

  constructor(public router: Router) { }

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
    this.reviewForm.value;
    console.log("review is submitted");
    this.router.navigate(['/reviewConfirmation']);
  }

  checked=false;
  toggle(checked) {
    checked = true;
    console.log(checked);
  }
  countConfirm(i){
    this.safetyMeasuresList[i].confirmed =+ 1; 
    console.log(this.safetyMeasuresList[i].confirmed);
  }
}
