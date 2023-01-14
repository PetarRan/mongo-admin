import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { use } from 'passport';
import { forkJoin, Observable } from 'rxjs';
import { filter, find, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { User } from 'src/models/user.model';
import * as actions from '../../store/users/users.actions';
import * as selectors from '../../store/users/users.selectors';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  users: User[] | null = null;

  constructor(private router:Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.store.select(selectors.selectAllUsers).subscribe((users) => this.users = users);
  }

  createAnAccount(pageName: string) : void {
    this.router.navigate([`${pageName}`]);
  }

  login() {
    // console.log(this.username); 
    this.store.dispatch(actions.login({
      username: this.username,
      password: this.password
    }));
    this.router.navigateByUrl('/profile');

    this.users?.forEach((el) => {
      if(this.username == el.userName)
      {
        localStorage.setItem("id", el.id );
      }
    })
  }


}
