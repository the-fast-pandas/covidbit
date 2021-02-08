import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginCredentials: FormGroup = new FormGroup({}); 
  alert:Boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.loginCredentials = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  checkLoginForm() {

    if (this.loginCredentials.controls.invalid) {
      this.alert = true;
    }
    else {
      this.alert = false;
    }
   
  }

  onSubmit(): void {
    console.log(this.loginCredentials.value);
  }

  onClose() {
    this.alert = false;
  }

}
