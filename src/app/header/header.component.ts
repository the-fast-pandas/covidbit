// Server - CovidBit - Fast Pandas
// Created: Yevgeniya Anasheva
// Changed: 15, February, 2021, Teresa Costa, added logout method, profile method


import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedIn = false;

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.loggedIn = this.authService.loggedIn;
      }
    })

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == "Profile") {
          this.router.navigate(['business-dashboard']);
        }
        if (title == "Logout") {
          this.authService.doLogout();
        }
      });
  }
}
