import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
// import { timingSafeEqual } from 'crypto';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { User } from '../../../models/user.model';
import * as selectors from '../../store/users/users.selectors';
import * as actions from '../../store/users/users.actions';
import { Business } from 'src/models/business.model';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  public dialogg: any;

  @Input()name: string | undefined = '';
  @Input()lastName: string | undefined = '';
  @Input()job: string | undefined = '';
  // @Input()salary: number | undefined= 0;
  // @Input()businesses: Business [] | undefined   = [];
  // @Input()expenses: Number [] | undefined   = [];
  @Input()pic: string | undefined = '';
  
  users: Observable<User[]>= of([]);
  @Input()user: User | null = null;

  userId: string | null = localStorage.getItem("id");

  selectedUserIdObs: Observable<string> = of('');
  selectedUserId: string = '';

  constructor(private router: Router, private store: Store<AppState>) {}

  //id = localStorage.getItem('id');
  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);
    this.users.pipe(
      map((x) =>  x.filter((el) => el.id == this.userId))
    ).subscribe((user) => {
        this.user = user[0];
        this.name = this.user?.name;
        this.job = this.user?.job; 
        this.lastName = this.user?.lastName; 
        this.pic = this.user?.picture; 
      });

  }
 
  
  klik(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  logout(){
    const access_token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("id");
    if(access_token && userId){
      localStorage.removeItem("access_token");
      localStorage.removeItem("id");
      
      this.router.navigateByUrl("/login");
    }
  }
  
}
