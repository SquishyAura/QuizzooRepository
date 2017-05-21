import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'welcome-app',
  templateUrl: 'welcome.component.html',
})
export class WelcomeComponent {

  constructor(private router: Router){ }

  ngOnInit(){
    if(localStorage.getItem('user')){
      this.router.navigateByUrl('/home');
    }
  }
}
