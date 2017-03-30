import { Component } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  moduleId: module.id,
  selector: 'home-app',
  templateUrl: 'home.component.html',
})
export class HomeComponent  { 
  name = 'Angular'; 

  constructor(){ 
    console.log("Logged in as " + localStorage.getItem('user'))
  } 


}
