import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject,  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  constructor(private _data: DataService) { }


  objectKeys = Object.keys;
  cryptos: any;
  
  ngOnInit(): void {

    
      this._data.getPrices()
        .subscribe(res => this.cryptos = res)

  }
}
  