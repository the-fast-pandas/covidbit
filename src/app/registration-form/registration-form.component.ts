import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms'
import { User } from './user.model'


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  alert:Boolean = false;

  //Business Types Array
  businessTypes = [
    {name: "Resturant"},
    {name: "Botique"},
    {name: "Specialized Skill"},
    {name: "Food and Hospitality"},
    {name: "IT and Internet"},
    {name: "Business"},
    {name: "Labor"}
  ]

  //Form Groups
  userCredentials: FormGroup = new FormGroup({});
  tester:FormGroup = new FormGroup({});
  businessLocation = '';
  registeredUser:any;

  get formArray(): AbstractControl | null { return this.userCredentials.get('formArray'); }

  ngOnInit(): void {

    this.userCredentials = new FormGroup({     
      accountDetails: new FormGroup({
        businessName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        businessType: new FormControl('', [Validators.required]),
      }),
      businessDetails: new FormGroup({
        businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
        businessLocation: new FormControl('', [Validators.required])
      })
    })

  }

  onSubmit(): void {
    // console.log(this.userCredentials.value);
  }

  checkRegistrationForm() {

    if (this.userCredentials.controls.accountDetails.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
   
  }

  checkBusinessInfoForm()  {
    if (this.userCredentials.controls.businessDetails.invalid) {
      this.alert = true;
    } else {
      this.alert = false;
    }
  }

  onClose() {
    this.alert = false;
  }

  public handleAddressChange(address: any) {
    
    this.userCredentials.get('businessDetails.businessLocation')?.setValue(address.formatted_address);
  }

}
