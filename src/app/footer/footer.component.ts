import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth-services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  loginCredentials: FormGroup = new FormGroup({});

  constructor(public authService: AuthService, public router: Router) { }

  Admin: boolean = false;

  ngOnInit(): void {
    this.loginCredentials = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(8)])
    })
    this.Admin = this.authService.isAdmin;
  }
  // Cheks login credentials
  onSubmit() {
    this.authService.logInAdmin(this.loginCredentials.value);
  }

  onLogout(){
    this.authService.doLogoutAdmin();
    window.location.reload();   
  }
}
