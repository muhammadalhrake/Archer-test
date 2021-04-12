import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UsersListService {
  reqres = 'https://reqres.in/api'
  constructor(
    private http: HttpClient

  ) { }

  getUsers():Observable<any> {
    const usersUrl="https://jsonplaceholder.typicode.com/posts";
    return this.http.get<any>(usersUrl)
  }
  getUserPerPage(page: string) {
    const params = (new HttpParams()).set('page', page)
    return this.http.get<any>(`${this.reqres}/users`, { params }).pipe(
      map(({ data }) => data as reqresUser[])
    )
  }
  getUserPerPageById(id: string) {
    return this.http.get<any>(
      `${this.reqres}/users/${id}`
    )
  }
}
interface reqresUser {
  "id": number;
  "email": string;
  "first_name": string;
  "last_name": string;
  "avatar": string;
}
