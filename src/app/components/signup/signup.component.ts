import { LoginServiceService } from './../../login-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup = this.fb.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email: ['', [Validators.required ,Validators.email]],
    password: ['', [Validators.required,Validators.minLength(5)]]
  });

  hide = true;
  submitted = false;
  constructor(
    private loginService:LoginServiceService,
    public router:Router,
    public fb:FormBuilder
  ) { }

  ngOnInit(): void {
  }
  get f() { return this.form.controls; }

  onSubmit() {
    let user = {
      first_name:this.form.get('firstName')?.value,
      last_name:this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    };
    let user2={
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value
    }

    this.loginService.registerUser(user2).subscribe(
      (res: any) => {
        this.loginService.addUser(user);
        this.router.navigate(["signin/register",1]);
        console.log(res);
      },
      error => {
        //this.loginService.addUser(user);
        //this.router.navigate(["signin/register",1]);
        this.loginService.openSnackBar("This user is not found in Reqres register >> please try again  :)","Ok")
        console.log("The user not here");
        console.log(user);
      }
    );
}
}

