import {LoginComponent} from './login.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core'; 

describe('logincomponent',()=>{
let logcomp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let de: DebugElement;
let htl: HTMLElement;
beforeEach(() =>{
    TestBed.configureTestingModule({
        declarations: [LoginComponent]
    })
    }); 

    fixture = TestBed.createComponent(LoginComponent);
    logcomp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.loginMenuContainer'));
    htl = de.nativeElement;
});