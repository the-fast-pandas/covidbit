import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { DataService } from '../../services/data-services/data.service';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.scss']
})
export class CertificationFormComponent implements OnInit {

  userCredentials: FormGroup = new FormGroup({});
  safetyMeasureList: any = [];
  acceptedGuidelines: Boolean = false;

  // Form Variables
  id: String = "";
  businessName: String = 'What is your name?';
  firstName: String = 'James';
  lastName: String = 'Bond';
  businessLocation: String = 'Where are you?';
  businessPhone: String = 'Add a Phone';
  email: String = 'myemail@host.com.ca';
  webSite: String = 'to be added';
  businessType: String = 'Type of Business';

  constructor(public auth: AuthService, public router: Router, public data: DataService, private activatedRoute: ActivatedRoute) { 
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.data.getUserView(id)
      .subscribe(
        data => {
          this.id = data.user._id;
          this.businessName = data.user.businessName;
          this.firstName = data.user.firstName;
          this.lastName = data.user.lastName;
          this.businessPhone = data.user.phoneNumber;
          this.businessLocation = data.user.location;
          this.businessType = data.user.businessType;
          this.safetyMeasureList = data.user.safetyMeasures;
        })
  }

  onSubmit(): void {
    console.log(this.userCredentials.value);
    this.auth.addCertification(this.userCredentials.value, this.id);
  }
  
  // toggle(checked: boolean) {
  //   this.acceptedGuidelines = checked;
  // }

  ngOnInit(): void {

    this.userCredentials = new FormGroup({
      guidelines: new FormGroup({
        acceptedGuidelines: new FormControl('', [Validators.required])
      }),
      safetyMeasures: new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      })
    })
  }

  onAddMeasure() {

    const safetyMeasure = {
      title: this.userCredentials.get('safetyMeasures.title')?.value,
      description: this.userCredentials.get('safetyMeasures.description')?.value
    }
    this.safetyMeasureList.push(safetyMeasure);
    this.userCredentials.get('safetyMeasures.title')?.reset()
    this.userCredentials.get('safetyMeasures.description')?.reset()
  }

}
