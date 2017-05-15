import { RegisterComponent } from '../register.component';
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
import { RegisterObserverService} from '../registerObserver.service';

describe('RegisterComponent', function() {
    let socketService: SocketService;
    let RegisterComp: RegisterComponent;
    let registerfixture: ComponentFixture<RegisterComponent>;
    let AppComp: AppComponent;
    let appfixture: ComponentFixture<AppComponent>;
    let service: RegisterObserverService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [RegisterComponent, AppComponent],
            providers: [SocketService, RegisterObserverService, AppComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        socketService = new SocketService();
        service = new RegisterObserverService(socketService);
        registerfixture = TestBed.createComponent(RegisterComponent);
        RegisterComp = registerfixture.componentInstance; 
        appfixture = TestBed.createComponent(AppComponent); 
        AppComp = appfixture.componentInstance;
    });

    it('should create component', () => { 
        
        expect(RegisterComp).toBeDefined()
    });

    /*it('should not be able to register if username exists in database', (done: DoneFn) => {
        RegisterComp.username = 'doaldoal';
        RegisterComp.password1 = '6789';
        RegisterComp.password2 = '6789';

        service.register(RegisterComp.username, RegisterComp.password1, RegisterComp.password2).subscribe(data => 
            { 
                expect(data).toEqual(true);
                done();
            }
        ) 
    });*/
});