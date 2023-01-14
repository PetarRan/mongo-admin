import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Business } from 'src/models/business.model';
import * as actions from '../../store/users/users.actions';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  name: string = '';
  lastName: string = '';
  userName: string = '';
  password: string = '';
  repeatedPassword: string = '';
  job: string = '';
  salary: number = 0;
  expenses: number[] = [];
  businesses: Business[] = [];
  picture: string = '';
  constructor(private router: Router, private store: Store<AppState>) {}





  ngOnInit(): void {}
  
  createAccount() {

    this.makeExpensesList();

    if (this.checkFields()) {
      this.store.dispatch(actions.addNewUser({
        name: this.name,
        lastName: this.lastName,
        userName: this.userName,
        password: this.password,
        job: this.job, 
        salary: this.salary,
        businesses: this.businesses,
        expenses: this.expenses,
        picture: this.picture 
      }))
      alert("Uspesno ste kreirali profil! Sada se ulogujte.")
      this.router.navigateByUrl("/login");
    }
    else{
      alert("Morate popuniti sva polja. Plata mora biti veca od 0");
    }

  }
  checkFields(): boolean {
    if (
      this.name != '' &&
      this.lastName != '' &&
      this.userName != '' &&
      this.password != '' &&
      this.repeatedPassword != '' &&
      this.job != '' &&
      this.picture != '' &&
      this.salary > 0
    ) {
      return true;
    } else return false;
  }
  backToLogin(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
  makeExpensesList(){
    for(let i = 0 ; i < 6 ; i++ ){
      this.expenses.push(Math.floor((Math.random() * 100)));
    }
  }
}
