import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import { QuizObserverService } from './quizObserver.service'

@Component({
  moduleId: module.id,
  selector: 'home-app',
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
  quizzesToDisplay: any = [];
  quizAverage: any[] = [];
  service: any;
  data: any;

  constructor(private quizObserverService: QuizObserverService) {
    console.log("Logged in as " + localStorage.getItem('user'));
  }

  ngOnInit() {
    this.service = this.quizObserverService.getPublicQuizzes().subscribe(data => {
      this.quizzesToDisplay = data;
      this.calculateAverage(this.quizzesToDisplay, this.quizAverage);
    })
  }

  calculateAverage(input: any, output: any) {
    //calculate average rating of each quiz
    for (let i = 0; i < input.length; i++) {
      let sum = 0;
      if (input[i].ratings.length == 0) { //if quiz has not been rated
        output[i] = "Not rated yet."
      }
      else //else we go through ratings and find their average
      {
        for (let j = 0; j < input[i].ratings.length; j++) {
          sum = sum + input[i].ratings[j];
        }

        let average = sum / input[i].ratings.length;
        output[i] = Math.round(average * 10) / 10; //max 1 decimal
      }
    } 
    return output;
  }


}
