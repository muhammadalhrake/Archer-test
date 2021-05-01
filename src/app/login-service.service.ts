import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const key="value-any"
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  userFServes: BehaviorSubject<any> = new BehaviorSubject({});
  userInStream: BehaviorSubject<any> = new BehaviorSubject({});
  private userSubject!: BehaviorSubject<Users>;
  public user: Observable<Users> | undefined;
  base="https://reqres.in"
  constructor(
    private http:HttpClient,
    private _snackBar:MatSnackBar
  ) { }

  login(username: any, password: any) {
    return this.http.post<Users>(`${this.base}/api/login`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
    }));
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  createUsers(user: Users[]) {
    return this.http.post(`https://reqres.in/api/users`,user).
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

  registerUser(user:any) {
    return this.http.post(`${this.base}/api/register`, user);
  }
  loginUser(user: { email:string; password:any }) {
    return this.http.post(`${this.base}/api/login`, user);
  }
  logIn() {
    const key="value-any"
    return this.userInStream.next(
      JSON.parse(localStorage.getItem(key)!)
    );
  }
  addUser(user: any) {
    if (!localStorage.getItem("value-any")) {
      localStorage.setItem("value-any", JSON.stringify(user));
      this.userInStream.next(user);
    }
  }
  delete(user:any){
    this.http.delete(`${this.base}/api/users/` + user.id)
  }
}
interface Users {
  "id": number;
  "email": string;
  "first_name": string;
  "last_name": string;
  "avatar": string;
}
interface user{
  email:string
  password:string
}
