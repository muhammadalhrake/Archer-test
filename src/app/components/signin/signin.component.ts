import { LoginServiceService } from './../../login-service.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
   token:Object='its token ';
  constructor(
    public loginService : LoginServiceService
  ) { }
  hide = true;
  ngOnInit(): void {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  email = new FormControl('');
  password = new FormControl('');
  getEmailValue(){
    return this.email.value;
  }
  getPassword(){
    return this.password.value;
  }
  updateName(){
    //console.log(this.loginService.login(this.getEmailValue(),this.getPassword()).subscribe(x=>{this.token=x}))
    this.loginService.login(this.getEmailValue(),this.getPassword()).subscribe(x=>{console.log(this.token=x)})
  }


 
  
}
