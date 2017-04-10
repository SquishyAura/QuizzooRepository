import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from "socket.io-client";
import { QuizObserverService } from './quizObserver.service'

@Component({
  moduleId: module.id,
  selector: 'home-app',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy { 
  quizzesToDisplay:any = [];
  service: any;
  data: any;

  constructor(private quizObserverService:QuizObserverService){ 
    console.log("Logged in as " + localStorage.getItem('user'));
  } 

  ngOnInit() {
    this.service = this.quizObserverService.getQuizzes().subscribe(data => {
      this.quizzesToDisplay = data;
    })
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }
}
