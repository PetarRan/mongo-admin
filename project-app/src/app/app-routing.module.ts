import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { BusinessDialogComponent } from './components/business-dialog/business-dialog.component';
import { AppComponent } from './app.component';
//u ovom modulu definisemo rute
const routes: Routes = [
  {  path: '',
    pathMatch: 'full',
    redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: NewAccountComponent },
  { path: 'profile', component: DashboardComponent},
  { path: 'dialog', component: BusinessDialogComponent},
  { path: 'edit-profile', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
