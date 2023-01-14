import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { Business } from 'src/models/business.model';
import { User } from 'src/models/user.model';
import * as actions from '../../store/users/users.actions';
import * as selectors from '../../store/users/users.selectors';

@Component({
  selector: 'app-business-table',
  templateUrl: './business-table.component.html',
  styleUrls: ['./business-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessTableComponent implements OnInit {
  user: User | null = null; //ovo mi je u interesu da bude Observable<User>
  // /* @Input() */ businesses: Observable<Business[]>=  this.store.select(selectors.selectAllUsers);
  users: Observable<User[]> = this.store.select(selectors.selectAllUsers);

  userId: string | null = localStorage.getItem("id");

  businessName: string = '';
  income: number = 0;

  noviBiznis: Business = {
    businessName: this.businessName,
    income: this.income,
  };

  noviNizBiznisa = this.user?.businesses;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);

    this.users.pipe(
      map((x) =>  x.filter((el) => el.id == this.userId))
    ).subscribe((user) => {
       this.user = user[0];
      // this.businesses = this.user?.businesses;
    });
  }

  importBusiness() {
    if (this.user) {
      // alert(this.user?.id) //loguje lepo taj ID koji treba
      this.store.dispatch(
        actions.addNewBusiness({
          userId: this.user?.id,
          businessName: this.businessName,
          income: this.income,
        })
      );
    }
  }

  deleteBusiness(business: Business) {
    if (this.user) {
      this.store.dispatch(
        actions.deleteBusiness({
          userId: this.user?.id,
          businessName: business.businessName,
        })
      );
      this.ngOnInit();
    }
  }
}
//pic1: luka
// https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-9/120158015_3329612337092338_731594424526376001_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=K9CfsGV2ZdIAX_kDTas&tn=nN__OSS_iyC2Y_xu&_nc_ht=scontent.fbeg10-1.fna&oh=33294bf47f90b16a3ab85861276287c1&oe=6193E1D5

//pic2: profilePic avatar
// https://www.kindpng.com/picc/m/78-785975_icon-profile-bio-avatar-person-symbol-chat-icon.png

//pic3: profile pic 3
// https://previews.123rf.com/images/kritchanut/kritchanut1406/kritchanut140600067/29035229-yellow-male-avatar-profile-picture-icon-in-circle.jpg