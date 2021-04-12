import { UsersListService } from './../../users-list.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { filter, switchMap , map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  @Output()newItemEvent = new EventEmitter();

  addNewItem(value:any) {
    this.newItemEvent.emit(value);
  }
  currentPage = this.route.paramMap.pipe(map((paramsMap) => paramsMap.get('id')))
  users$ =this.currentPage.pipe(switchMap((value=>this.userService.getUserPerPage(value!))))
  constructor(
    private userService: UsersListService,
    private route:ActivatedRoute
  ) { }
  onPrevious(){}
  onNext(){}
  displayedColumns: string[] = ['avatar', 'first-name', 'last-name', 'email'];
}
interface user {
  "id":string;
  "avatar": string;
  "first_name": string;
  "last_name": string;
  "email": string;
}
