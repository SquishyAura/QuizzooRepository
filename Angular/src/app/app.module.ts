import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent }  from './app.component';
import { WelcomeComponent }  from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TemplateComponent } from './template/template.component';
import { QuestionComponent } from './template/question.component'; 
import { AnswerComponent } from './template/answer.component'; 
import { QuizComponent } from './home/quiz.component';
import { ProfileComponent } from './profile/profile.component';
import { QuizStatisticsComponent } from './home/quizStatistics.component';

import { SocketService } from './global/socket.service';
import { AuthService } from './global/auth.service';
import { QuizObserverService } from './home/quizObserver.service';
import { LoginObserverService } from './login/loginObserver.service';
import { RegisterObserverService } from './register/registerObserver.service';

@NgModule({
  imports:      [ BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                RouterModule.forRoot([
                   { path: '', redirectTo: 'welcome', pathMatch: 'full'},
                   { path: 'welcome', component: WelcomeComponent},
                   { path: 'login', component: LoginComponent },
                   { path: 'register', component: RegisterComponent},
                   { path: 'home', component: HomeComponent, canActivate: [AuthService]},
                   { path: 'template', component: TemplateComponent, canActivate: [AuthService]},
                   { path: 'home/quiz/:id', component: QuizComponent, canActivate: [AuthService]},
                   { path: 'profile', component: ProfileComponent, canActivate: [AuthService]},
                   { path: 'home/quiz/:id/statistics', component: QuizStatisticsComponent, canActivate: [AuthService]},
                ])
  ],
  declarations: [ AppComponent,
                  WelcomeComponent,
                  LoginComponent,
                  RegisterComponent,
                  HomeComponent,
                  TemplateComponent,
                  QuestionComponent,
                  AnswerComponent,
                  QuizComponent,
                  ProfileComponent,
                  QuizStatisticsComponent,
                ],
  providers: [ SocketService,
               AuthService,
               QuizObserverService,
               LoginObserverService,
               RegisterObserverService,
             ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
