import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from './../../login-service.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required ,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(5)]]
  });
    //this is variable
    loading =false;
    id=1;
    returnUrl:string=''
    submitted = false;
    token:Object='its token ';
    errorMessage: any;
    ///..............

  constructor(
    public loginService : LoginServiceService,
    private http:HttpClient,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router :Router,
    private _snackBar: MatSnackBar
  ) { }
  hide = true;
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.form.controls; }
  getEmailValue(){
    return this.form.get('email')?.value;
  }
  getPassword(){
    return this.form.get('password')?.value;
  }

  updateName(){
    //console.log(this.loginService.login(this.getEmailValue(),this.getPassword()).subscribe(x=>{this.token=x}))
    this.loginService.login(this.getEmailValue(),this.getPassword()).subscribe({
      next: data => {
        this.router.createUrlTree(['/signin', 'signin/register', 1]);
        console.log( this.router.createUrlTree(['/signin', 'signin/register', 1]))
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  })
  }
  onSubmit() {
    let user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };

    this.loginService.loginUser(user).subscribe(
      (res: any) => {
        this.loginService.addUser(user);
        this.router.navigate(["signin/register",1]);
        console.log("The user  here");
      },
      error => {
        this.router.navigate(["signin/signup"]);
        console.log("The user not here");
        console.log(user);
        this.loginService.openSnackBar("This user is not logged in our site ","Ok")
      }
    );
}
}
