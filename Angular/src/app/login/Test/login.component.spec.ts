import { LoginComponent } from '../login.component';
import { AppComponent }  from '../../app.component';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { async, ComponentFixture, TestBed, inject, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as io from "socket.io-client";
import { RouterTestingModule } from '@angular/router/testing';
import { SocketService } from '../../global/socket.service';
import { LoginObserverService} from '../loginObserver.service';
 


describe('LoginComponent', function () {
    let de: DebugElement;
    let socketService: SocketService;
    let LoginComp: LoginComponent;
    let loginfixture: ComponentFixture<LoginComponent>;
    let AppComp: AppComponent;
    let appfixture: ComponentFixture<AppComponent>;
    let service: LoginObserverService;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule,FormsModule],
            declarations: [LoginComponent, AppComponent],
            providers: [SocketService, LoginObserverService, AppComponent]

        }).compileComponents();
    }));

    beforeEach(() => {
        socketService = new SocketService();
        service = new LoginObserverService(socketService);
        loginfixture = TestBed.createComponent(LoginComponent);
        LoginComp = loginfixture.componentInstance; 
        appfixture = TestBed.createComponent(AppComponent); 
        AppComp = appfixture.componentInstance;
    });

    it('should create component', () => expect(LoginComp).toBeDefined());
    
    it('should successfully login if username and password exist in database', (done: DoneFn) => {

        LoginComp.username = 'doaldoal';
        LoginComp.password = '12341234';
        
        service.login(LoginComp.username, LoginComp.password).subscribe(data => 
            { 
                expect(data).toEqual(true);
                done();
            }
        ) 
        

        
    });
});
