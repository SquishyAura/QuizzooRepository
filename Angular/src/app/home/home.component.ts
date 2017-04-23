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
  quizAverage:any[] = [];
  service: any;
  data: any;

  constructor(private quizObserverService:QuizObserverService){ 
    console.log("Logged in as " + localStorage.getItem('user'));
  } 

  ngOnInit() {
    this.service = this.quizObserverService.getPublicQuizzes().subscribe(data => {
      this.quizzesToDisplay = data;

      //calculate average rating of each quiz
      for(let i = 0; i < this.quizzesToDisplay.length; i++){
        let sum = 0;
        if(this.quizzesToDisplay[i].ratings.length == 0){ //if quiz has not been rated
          this.quizAverage[i] = "Not rated yet."
        }
        else //else we go through ratings and find their average
        {
          for(let j = 0; j < this.quizzesToDisplay[i].ratings.length; j++){
            sum = sum + this.quizzesToDisplay[i].ratings[j];
          }
          
          let average = sum / this.quizzesToDisplay[i].ratings.length;
          this.quizAverage[i] = Math.round(average * 10) / 10; //max 1 decimal
        }
      }
    })
  }

  ngOnDestroy() {
    this.service.unsubscribe();
  }

  calculateAverageRating(ratings: any){
    
  }
}
