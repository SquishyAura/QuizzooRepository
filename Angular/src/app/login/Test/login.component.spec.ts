import { LoginComponent } from '../login.component';
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
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule,
                FormsModule],
            declarations: [LoginComponent],
            providers: [SocketService]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;


    });

    it('should create component', () => expect(comp).toBeDefined());
    


});
