import { UsersListService } from './../../users-list.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, map, filter, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {
  users:user ={
    "avatar": "hhhhh",
    "first_name": "string",
    "last_name": "string",
    "email": "string"
  }
  id = this.route.paramMap.pipe(map((paramsMap) => paramsMap.get('id')))
  users$ =this.id.pipe(
    filter(id=>!!id),
    switchMap((value=>this.userService.getUserPerPageById(value!))),
    map(user=>user.data)
    )
  constructor(
    private route :ActivatedRoute,
    private http:HttpClient,
    private userService: UsersListService
  ) { }

  ngOnInit(): void {
  }
  addItem(newItem:user) {
    this.users=newItem ;
  }

}
interface user {
  "avatar": string;
  "first_name": string;
  "last_name": string;
  "email": string;
}
