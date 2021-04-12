import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  base="https://reqres.in/"
  constructor(
    private http:HttpClient
  ) { }

  login(userName:string , password:string ){
    //console.log(this.http.post(`${this.base}api/login`,{'email': userName , 'password':password }));
    return this.http.post(`${this.base}api/login`,{'email': userName , 'password':password })
  }
}
