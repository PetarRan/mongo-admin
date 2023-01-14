import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'node_modules/chart.js';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { Business } from 'src/models/business.model';
import { User } from 'src/models/user.model';
import * as actions from '../../../store/users/users.actions';
import * as selectors from '../../../store/users/users.selectors';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input()salary: number | undefined= 0;
  businesses: Business [] | undefined   = [];
  @Input()expenses: number [] | undefined = [ ];

  myChart: any;

  totalIncome: number | undefined = 0;
  totalExpenses: number | undefined = 0;
  countBusinesses: number | undefined = 0;
  sumBusinesses: number | undefined = 0;
  userId: string | null = localStorage.getItem("id");

  users: Observable<User[]>= of([]);
  @Input()user: User | null = null;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);
    
    this.users.pipe(
      map((x) =>  x.filter((el) => el.id == this.userId))
      ).subscribe((user) => {
        this.user = user[0];
      this.businesses = this.user?.businesses;
    if(this.myChart) this.myChart.destroy();
      this.drawChart();
    })
  }
  drawChart(){
    if(this.myChart) this.myChart.destroy();

    // chart starts
         const labels = ['jan','feb','mart','apr','may','jun','jul']
         this.myChart = new Chart('myChart', {
         type: 'line',
         data :{
             labels: labels,
             datasets: [{
               label: 'EXPENSE',
              //  data: [0 , 59, 80, 81, 56, 55, 40],
               data: this.user?.expenses,
               fill: false,
               borderColor: 'white',
               tension: 0.1
             }]
           },
         options: {
             scales: {
                 y: {
                     beginAtZero: true
                    }
                  }
                }
              }  
              );
              // chart ends

  }

}
    // this.store.dispatch(actions.loadUsers());
    // this.users = this.store.select(selectors.selectAllUsers);

    // this.users.pipe(
    //   map((x) => this.user = x[0])
    // ).subscribe(() => {
    //     this.salary = this.user?.salary; 
    //     this.businesses = this.user?.businesses;
    //     this.expenses = this.user?.expenses;

    //     this.totalExpenses = this.user?.expenses.reduce((partial_sum, a) => partial_sum + a,0);
    //     this.countBusinesses = this.user?.businesses.length;
    //     this.sumBusinesses = this.user?.businesses.reduce((partial_sum, a) => partial_sum + a.income,0);
    //     if(this.salary && this.sumBusinesses && this.totalExpenses)
    //     this.totalIncome = this.salary + this.sumBusinesses - this.totalExpenses;

    //     // console.log(this.user?.expenses[2]);
        
    //   setTimeout(() => {
    //     // chart starts
    //      const labels = ['jan','feb','mart','apr','may','jun','jul']
    //      var ctx = document.getElementById(this.chartId);
    //      var myChart = new Chart(this.chartId, {
    //      type: 'line',
    //      data :{
    //          labels: labels,
    //          datasets: [{
    //            label: 'CURRENT VALUES',
    //           //  data: [0 , 59, 80, 81, 56, 55, 40],
    //            data: this.user?.expenses,
    //            fill: false,
    //            borderColor: 'white',
    //            tension: 0.1
    //          }]
    //        },
    //      options: {
    //          scales: {
    //              y: {
    //                  beginAtZero: true
    //                 }
    //               }
    //             }
    //           }  
    //           );
    //           // chart ends
    //   }, 200)
    //   })


/* 
//chart starts
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'node_modules/chart.js';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import { Business } from 'src/models/business.model';
import { User } from 'src/models/user.model';
import * as actions from '../../../store/users/users.actions';
import * as selectors from '../../../store/users/users.selectors';
@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class ChartComponent implements OnInit {
  @Input()salary: number | undefined= 0;
  @Input()businesses: Business [] | undefined   = [];
  @Input()expenses: number [] | undefined = [ ];


  totalIncome: number | undefined = 0;
  totalExpenses: number | undefined = 0;
  countBusinesses: number | undefined = 0;
  sumBusinesses: number | undefined = 0;

  users: Observable<User[]>= of([]);
  user: User | null = null;
  chartId : string = 'myChart3';
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);

    this.users.pipe(
      map((x) => this.user = x[0])
    ).subscribe(() => {
        this.salary = this.user?.salary; 
        this.businesses = this.user?.businesses;
        this.expenses = this.user?.expenses;

        this.totalExpenses = this.user?.expenses.reduce((partial_sum, a) => partial_sum + a,0);
        this.countBusinesses = this.user?.businesses.length;
        this.sumBusinesses = this.user?.businesses.reduce((partial_sum, a) => partial_sum + a.income,0);
        if(this.salary && this.sumBusinesses && this.totalExpenses){
          this.totalIncome = this.salary + this.sumBusinesses - this.totalExpenses;
        }

        // console.log(this.user?.expenses[2]);
        
      setTimeout(() => {
        // chart starts
        var ctx = document.getElementById(this.chartId);
    var myChart = new Chart(this.chartId, {
    type: 'doughnut',
    data : {
      labels: [
        "$businesses",
        "$expenses",
        "$salary",

      ],
      datasets: [{
        label: 'My First Dataset',
        data: [this.sumBusinesses, this.totalExpenses, this.salary],
        backgroundColor: [
          'rgb(253,180,14)',
          'rgb(201,29,29)',
          'rgb(42,191,193)'
        ],
        hoverOffset: 5
      }]
    },
    options: {
        scales: {
           
        }
    }
});
              // chart ends
      }, 2000)
      })

  }

}

//chart ends




*/