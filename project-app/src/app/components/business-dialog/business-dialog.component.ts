import { Component, Inject, Input, OnInit } from '@angular/core';
import * as actions from '../../store/users/users.actions';
import * as selectors from '../../store/users/users.selectors';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import { Business } from 'src/models/business.model';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user.model';
import { map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface BusinessDialog extends Business {
  delete: boolean;
}
@Component({
  selector: 'app-business-dialog',
  templateUrl: './business-dialog.component.html',
  styleUrls: ['./business-dialog.component.scss'],
})
export class BusinessDialogComponent implements OnInit {
  @Input() businesses: Business[] | undefined = [];

  countBusinesses: number | undefined = 0;
  sumBusinesses: number | undefined = 0;

  businessName : string = '';
  income : number = 0;

  users: Observable<User[]> = of([]);
  user: User | null = null;

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: BusinessDialog,
    private dialog2 : MatDialogRef<BusinessDialogComponent>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);

    this.users.pipe(map((x) => (this.user = x[0]))).subscribe(() => {
      this.businesses = this.user?.businesses;

      this.countBusinesses = this.user?.businesses.length;
      this.sumBusinesses = this.user?.businesses.reduce(
        (partial_sum, a) => partial_sum + a.income,
        0
      );
    });
  }
  desavanje(){
    console.log(this.businessName);
    console.log(this.income); 
  }
  importBusiness() {
    if(this.user?.id){
      this.store.dispatch(actions.addNewBusiness({
        userId: "615e02d05d3d30c20777dae1",
        businessName: this.data.businessName,
        income: this.data.income
      })) 
    }
      this.dialog2.close();
      
  }

}
