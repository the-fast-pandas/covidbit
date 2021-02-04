import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {


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

  }

  onSubmit(): void {
    console.log(this.userCredentials.get('password')?.value);
  }

}
