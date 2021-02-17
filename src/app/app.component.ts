import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'covidbit';
  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/home',
      home: true
    },
    {
      title: 'Users',
      icon: 'people-outline',
      link: '/users'
    },
    {
      title: 'Register',
      icon: 'edit-2-outline',
      link: '/registration-form'
    },
    {
      title: 'Login',
      icon: 'log-in-outline',
      link: '/login-form'
<<<<<<< HEAD
    }
=======
    },
>>>>>>> 7ffa663 (map visualization 1)
  ];
  constructor(private readonly sidebarService: NbSidebarService) {
  }
  
  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;
  }
}