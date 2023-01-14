import { Component, Input, OnInit } from '@angular/core';
import * as actions from '../../store/users/users.actions';
import * as selectors from '../../store/users/users.selectors';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import { Business } from 'src/models/business.model';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user.model';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-expenses-dialog',
  templateUrl: './expenses-dialog.component.html',
  styleUrls: ['./expenses-dialog.component.scss']
})
export class ExpensesDialogComponent implements OnInit {
  @Input()expenses: Number [] | undefined   = [];


  countBusinesses: number | undefined = 0;
  sumBusinesses: number | undefined = 0;
  userId: string | null = localStorage.getItem("id");

  users: Observable<User[]>= of([]);
  user: User | null = null;

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);

    this.users.pipe(
      map((x) => x.filter((el) => el.id == this.userId))
    ).subscribe((user) => {
        this.user = user[0];
        this.expenses = this.user?.expenses;
      })
    }
  }

