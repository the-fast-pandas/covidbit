// Server - CovidBit - Fast Pandas
// Created:               2021, Yevgeniya Anasheva
// Changed: 15, February, 2021, Teresa Costa, added integration with authentication, typescript variables


import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean = false;
  loggedInAdm: boolean = false;
  businessName: any = " ";
  id: any = "9";
  items: Array<any> = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        if (this.auth.isLoggedIn){
          this.loggedIn = this.auth.isLoggedIn;
          this.businessName = localStorage.getItem('name_header');
          this.id = localStorage.getItem('business_id')
        }else if (this.auth.isAdmin){
          this.loggedIn = this.auth.isAdmin;
          this.businessName = "Administrator"

        }
       
      }
    })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == "Profile") {
          if (this.auth.isLoggedIn) {
          this.router.navigate(['business-dashboard/' + this.id]);
        }else if  (this.auth.isAdmin){
          this.router.navigate(['admin-dashboard']);
        }
        }
        if (title == "Logout") {
          this.auth.doLogout();
        }
      });
  }
}