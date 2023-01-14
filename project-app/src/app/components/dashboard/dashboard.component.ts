import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { User } from 'src/models/user.model';
import { BusinessDialogComponent } from '../business-dialog/business-dialog.component';
import * as actions from '../../store/users/users.actions';
import * as selectors from '../../store/users/users.selectors';
import { filter, map } from 'rxjs/operators';
import { Business } from 'src/models/business.model';
import { ComponentType } from '@angular/cdk/portal';
import { ExpensesDialogComponent } from '../expenses-dialog/expenses-dialog.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @Input()businesses: Business [] | undefined   = [];
  @Input()expenses: Number [] | undefined   = [];
  // @Output() onClick: EventEmitter<User> = new EventEmitter<User>();

  // staticUserId: string = "615e02d05d3d30c20777dae1"; //ovo kad pravimo LogIn trbea da ubacimo ID u localStorage
  salary: number | undefined = 0;
  totalIncome: number | undefined = 0;
  totalExpenses: number | undefined = 0;
  countBusinesses: number | undefined = -1;
  sumBusinesses: number | undefined = 0;

  // probaUser : Observable<User> | null = null;

  users: Observable<User[]>= of([]);
  user: User | undefined; //ovde je bio @Input(), ali ne treba
  clickedUser: User | null = null;

  userId: string | null = localStorage.getItem("id");
  
  constructor(private dialog: MatDialog, public store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);
    this.users.pipe(
      map((x) => x.filter((el) => el.id == this.userId))
    ).subscribe((user) => {
     this.user = user[0];
    //  this.expenses = this.user.expenses;
     this.totalExpenses = this.user?.expenses.reduce((partial_sum, a) => partial_sum + a,0);
     this.countBusinesses = this.user?.businesses.length;
     this.sumBusinesses = this.user?.businesses.reduce((partial_sum, a) => partial_sum + a.income,0);
     this.salary = this.user?.salary;
          this.totalIncome = this.salary + this.sumBusinesses - this.totalExpenses;
     
    })
    
  }
    
   
    openDialog() : void {
      const br = Math.random() * 1000;
      this.dialog.open(ExpensesDialogComponent);
      console.log(br);
    }

    openBusinessTable(){
    
  }

  clicked(){
    // this.onClick.emit();
    }
   
  }
