import { LoginComponent } from '../login.component';
import { AppComponent }  from '../../app.component';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as io from "socket.io-client";
import { RouterTestingModule } from '@angular/router/testing';
import { SocketService } from '../../global/socket.service';


describe('LoginComponent', function () {
    let de: DebugElement;
    let socketService: SocketService;
    let LoginComp: LoginComponent;
    let loginfixture: ComponentFixture<LoginComponent>;
    let AppComp: AppComponent;
    let appfixture: ComponentFixture<AppComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule,
                FormsModule],
            declarations: [LoginComponent, AppComponent],
            providers: [SocketService]

        }).compileComponents();
    }));

    beforeEach(() => {
        loginfixture = TestBed.createComponent(LoginComponent);
        LoginComp = loginfixture.componentInstance; 
        appfixture = TestBed.createComponent(AppComponent); 
        AppComp = appfixture.componentInstance;
    });

    it('should create component', () => expect(LoginComp).toBeDefined());
    it('should fail to login', () => {
        LoginComp.username = 'doaldoal';
        LoginComp.password = '12341234';
        //expect(LoginComp.username).toBe('adawdawd');
        //expect(LoginComp.password).toBe('awdawdawd');
        console.log(LoginComp.username);

        //console.log(AppComp.loginSuccess());
        //expect(AppComp.loginSuccess()).toBe(true);
        
    })
});
