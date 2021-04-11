// Server - CovidBit - Fast Pandas
// Created: 10, February, 2021, Yevgeniya Anasheva
// Changed: 15, March, 2021, Teresa Costa, added integration with authentication, typescript variables, sidebar

import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
// Local Service
import { AuthService } from '../services/auth-services/auth.service';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  businessName: string = myGlobals.emptyField;
  id: String = myGlobals.emptyField;

  itemsTitle: Array<any> = [{ title: 'Profile' }, { title: 'Logout' }];
  itemsTitleAdm: Array<any> = [{ title: 'Dashboard' }, { title: 'Logout' }];

  // Sidebar Variables
  itemsMenu: Array<any> = [{
    title: 'Home',
    link: '/home',
    home: true
  },
  {
    title: 'Tracker Map',
    link: '/tracker-map',
  }]
  items: NbMenuItem[] = this.itemsMenu;

  // Nav Type Control
  loggedIn: Boolean = false;
  loggedInBusiness: Boolean = false;
  loggedInAdm: Boolean = false;

  constructor(private nbMenuService: NbMenuService, private router: Router, private auth: AuthService, private readonly sidebarService: NbSidebarService) {
    this.addMenu(1);
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        if (this.auth.isLoggedIn) {
          this.addMenu(2);
          this.loggedIn = this.auth.isLoggedIn;
          this.loggedInBusiness = this.auth.isLoggedIn;
          this.businessName = this.auth.getBusinessName() || myGlobals.emptyField;
          this.id = this.auth.getId() || myGlobals.emptyField;
        } else if (this.auth.isAdmin) {
          this.addMenu(3);
          this.loggedIn = this.auth.isAdmin;
          this.loggedInAdm = this.auth.isAdmin;
          this.businessName = "Administrator";
        }
      }
    });

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title == "Profile") {
          if (this.auth.isLoggedIn) {
            this.router.navigate(['business-dashboard/' + this.id]);
          }
        }
        if (title == "Dashboard") {
          if (this.auth.isAdmin) {
            this.router.navigate(['admin-dashboard']);
          }
        }
        if (title == "Logout") {
          this.auth.doLogout();
          this.loggedIn = false;
          this.loggedInAdm = false;
          this.loggedInBusiness = false;
        }
      })

  }

  ngOnInit() { }
  
  toggleSidebar(): Boolean {
    this.sidebarService.toggle();
    return false;
  }

  // Control Sidebar for Smartphone View
  addMenu(section) {
    let menuItem = {};
    if (section === 1) {
      menuItem = { title: "Login", link: "/login-form" }
      this.itemsMenu.push(menuItem);
    } else if (section === 2) {
      menuItem = { title: "Profile", link: '/business-dashboard/' + this.id }
      this.itemsMenu.pop();
      this.itemsMenu.push(menuItem);
    } else if (section === 3) {
      menuItem = { title: "Dashboard", link: '/admin-dashboard' }
      this.itemsMenu.pop();
      this.itemsMenu.push(menuItem);
    }
  }
}