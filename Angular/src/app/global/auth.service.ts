import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private router: Router) {}

  canActivate() { //decides if route can be activated or not. If not, redirect user to login page.
    if(localStorage.getItem('user')){
      return true;
    }
    else
    {
      this.router.navigateByUrl('/login')
      return false;
    }
  }
}