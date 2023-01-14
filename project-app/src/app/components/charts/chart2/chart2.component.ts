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
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {
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
    // console.log(this.user);
    
    this.store.dispatch(actions.loadUsers());
    this.users = this.store.select(selectors.selectAllUsers);

    this.users.pipe(
        map((x) => x.filter((el) => el.id == this.userId))
        ).subscribe((user) => {
        
        this.user = user[0];
        this.businesses = this.user?.businesses;
        if(this.myChart) this.myChart.destroy();
        this.drawChart();

    })

  }
  
  drawChart(){
        if(this.myChart) this.myChart.destroy();
        // chart start
        this.myChart = new Chart('myChart2', {
        type: 'bar',
        data: {
            labels: this.businesses!.map((business) => business.businessName),
            datasets: [{
                label: 'BUSINESSES REVENUES',
                // data: [12, 19, 3, 5, 2, 3, 15],
                data: this.user?.businesses!.map((business) => business.income),
                backgroundColor: [
                    'white',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }
    // chart ends
}
