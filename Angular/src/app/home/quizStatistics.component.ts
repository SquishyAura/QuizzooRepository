import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuizObserverService } from './quizObserver.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'quizStatistics-app',
  templateUrl: 'quizStatistics.component.html',
})
export class QuizStatisticsComponent implements OnInit, OnDestroy {
    service: any;
    data: any;

    statisticsToDisplay: any;
    combinedAnswers: number[] = [];
    
    constructor(private quizObserverService:QuizObserverService, private router:Router){}

    ngOnInit() {
      this.service = this.quizObserverService.getQuizStatistics(this.router.url).subscribe((data: any) => { //subscribes to service & gets JSON upon page load
          this.statisticsToDisplay = data;
          this.getCombinedNumberOfAnswers();
      })
    }

    getCombinedNumberOfAnswers(){
      let index = 0;
      for(let i = 0; i < this.statisticsToDisplay[0].questions.length; i++){
          this.combinedAnswers[index] = 0;
          for(let j = 0; j < this.statisticsToDisplay[0].questions[i].answers.length; j++){
            
              let numberOfClicks = parseInt(this.statisticsToDisplay[0].questions[i].answers[j].numberOfClicks);
              this.combinedAnswers[index] = this.combinedAnswers[index] + numberOfClicks;
          }
          index++;
      }
    }
    
    ngOnDestroy() {
      this.service.unsubscribe();
    }
}