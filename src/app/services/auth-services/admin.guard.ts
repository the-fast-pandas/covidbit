import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAdmin !== true) {
      //window.alert("You need administrator authentication!");
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}