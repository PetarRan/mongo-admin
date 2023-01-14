import { Moment } from 'moment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from './components/card/card.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChartComponent } from './components/charts/chart/chart.component';
import { Chart, registerables } from 'chart.js';
import { Chart2Component } from './components/charts/chart2/chart2.component';
import { Chart3Component } from './components/charts/chart3/chart3.component';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UsersService } from './services/users.service';
import { BusinessDialogComponent } from './components/business-dialog/business-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {  userReducer } from './store/users/users.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as env from '../../../project-app/src/environments/environment';
import { UsersEffects } from './store/users/users.effects';
import { ExpensesDialogComponent } from './components/expenses-dialog/expenses-dialog.component';
import { FormsModule } from '@angular/forms';
import { BusinessTableComponent } from './components/business-table/business-table.component';
Chart.register(...registerables);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAccountComponent,
    DashboardComponent,
    HeaderComponent,
    ProfilePicComponent,
    CardComponent,
    ChartComponent,
    Chart2Component,
    Chart3Component,
    TableComponent,
    EditProfileComponent,
    BusinessDialogComponent,
    ExpensesDialogComponent,
    BusinessTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ users: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: env.environment.production,
      autoPause: true,
    }),
    !env.environment.production ? StoreDevtoolsModule.instrument() : [],
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    LayoutModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EffectsModule.forRoot([UsersEffects]),
    FormsModule
  ],
  providers: [UsersService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
