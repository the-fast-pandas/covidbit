// Server - CovidBit - Fast Pandas
// Created:               2021, Yevgeniya Anasheva
// Changed: 15, February, 2021, Teresa Costa, added integration with authentication, typescript variables


import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
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
  itemsTitle: Array<any> = [{ title: 'Profile' }, { title: 'Logout' }];
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

  constructor(private nbMenuService: NbMenuService, private router: Router, private auth: AuthService, private readonly sidebarService: NbSidebarService) { }

  ngOnInit() {
    this.addMenu(1);
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        if (this.auth.isLoggedIn) {
          this.addMenu(2);
          this.loggedIn = this.auth.isLoggedIn;
          this.businessName = localStorage.getItem('name_header');
          this.id = localStorage.getItem('business_id')
        } else if (this.auth.isAdmin) {
          this.addMenu(3);
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
          } else if (this.auth.isAdmin) {
            this.router.navigate(['admin-dashboard']);
          }
        }
        if (title == "Logout") {
          this.auth.doLogout();
        }
      });
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;
  }

  addMenu(section) {
    let menuItem = {};
    if (section === 1) {
      menuItem = { title: "Login", link: "/login-form" }
      this.itemsMenu.push(menuItem);
    } else if (section === 2) {
      menuItem = { title: "Profile", link: 'business-dashboard/' + this.id }
      this.itemsMenu.pop();
      this.itemsMenu.push(menuItem);
    } else if (section === 3) {
      menuItem = { title: "Admin", link: '/admin-dashboard' }
      this.itemsMenu.pop();
      this.itemsMenu.push(menuItem);
    }
  }
}