import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { User } from 'src/models/user.model';
import * as actions from '../../store/users/users.actions';
import * as selectors from '../../store/users/users.selectors';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  users: Observable<User[]>= of([]);
  user: User | null = null;

  userId: string | null = localStorage.getItem("id");

  name: string = '';
  lastName: string = '';
  userName: string = '';
  password: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';
  job: string = '';
  constructor(private store: Store<AppState>) { }




  ngOnInit(): void {
    

  }


  updateClick(){
    // console.log(this.name);
    if(this.userId)
    this.store.dispatch(actions.updateUser(
      {
        id: this.userId,
        name: this.name,
        lastName: this.lastName,
        userName: this.userName,
        password: this.password,
        job: this.job
      }
    ))
    // location.reload();
  }
}
