import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UsersListService {
  reqres = 'https://reqres.in/api'
  constructor(
    private http: HttpClient,
    public _snackBar: MatSnackBar

  ) { }

  getUsers():Observable<any> {
    const usersUrl="https://jsonplaceholder.typicode.com/posts";
    return this.http.get<any>(usersUrl)
  }
  getUserPerPage(page: string) {
    const params = (new HttpParams()).set('page', page)
    return this.http.get<any>(`${this.reqres}/users?page=`+page, { params }).pipe(
      map(({ data }) => data as reqresUser[])
    )
  }
  getUserPerPageById(id: any) {
    return this.http.get<any>(
      `${this.reqres}/users/${id}`
    )
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  delete(id: number) {
    return this.http.delete(`${this.reqres}/users/${id}`)
        .pipe(map(x => {
            // auto logout if the logged in user deleted their own record
            this.openSnackBar(`The user in the id :${id} is deleted`,"Done")
            return x;
    }));
  }
}
interface reqresUser {
  "id": number;
  "email": string;
  "first_name": string;
  "last_name": string;
  "avatar": string;
}
