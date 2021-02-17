<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'

=======
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
>>>>>>> 7ffa663 (map visualization 1)

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

<<<<<<< HEAD
=======
  alert:Boolean = false;
>>>>>>> 7ffa663 (map visualization 1)

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

<<<<<<< HEAD
  selectedType: string = '';
  userCredentials: FormGroup = new FormGroup({});
  showPassword: boolean = true;
  ngOnInit(): void {

    this.userCredentials = new FormGroup({
      businessName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8) ]),
      confirmPassword: new FormControl('', [Validators.required]),
      businessType: new FormControl('', [Validators.required])
    });
=======
  //Form Groups
  userCredentials: FormGroup = new FormGroup({});
  tester:FormGroup = new FormGroup({});
  businessLocation = '';
  registeredUser:any;
  safteyMeasureList:any = [];
  
  constructor(private router: Router) { }

  ngOnInit(): void {

    this.userCredentials = new FormGroup({     
      accountDetails: new FormGroup({
        businessName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        businessType: new FormControl('', [Validators.required]),
      }),
      businessDetails: new FormGroup({
        businessPhone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
        businessLocation: new FormControl('', [Validators.required])
      }),
      safteyMeasures: new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      })
    })
>>>>>>> 7ffa663 (map visualization 1)

  }

  onSubmit(): void {
<<<<<<< HEAD
    console.log(this.userCredentials.get('password')?.value);
  }

}
=======
    console.log(this.userCredentials.value);
    console.log(this.safteyMeasureList);
    this.router.navigate(['/home']);
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

  onAddMeasure() {

    const safteyMeasure = {
    title: this.userCredentials.get('safteyMeasures.title')?.value,
    description: this.userCredentials.get('safteyMeasures.description')?.value}
    this.safteyMeasureList.push(safteyMeasure);
    this.userCredentials.get('safteyMeasures.title')?.reset()
    this.userCredentials.get('safteyMeasures.description')?.reset()
  }

  public handleAddressChange(address: any) {
    
    this.userCredentials.get('businessDetails.businessLocation')?.setValue(address.formatted_address);
  }

}
>>>>>>> 7ffa663 (map visualization 1)
