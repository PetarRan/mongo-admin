import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Business } from '../../models/business.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post<{ access_token: string }>(
        environment.URL + '/api/auth/login', //moja ruta
        { username: username, password: password },
        { withCredentials: true, observe: 'response' }
      )
      .pipe(catchError(errorHandler));
  }

  register(username: string, password: string) {
    return this.httpClient
      .post<{ username: string; password: string }>(
        environment.URL + '/register', //moja ruta
        { username: username, password: password },
        { withCredentials: true, observe: 'response' }
      )
      .pipe(catchError(errorHandler));
  }

  updateAccount(
    oldPassword: string,
    newPassword: string,
    newPasswordRepeat: string
  ) {
    return this.httpClient
      .patch<{ password: string }>(
        environment.URL + '/edit-profile', //moja ruta
        {
          oldpassword: oldPassword,
          newpassword: newPassword,
          newpasswordrepeat: newPasswordRepeat,
        },
        { withCredentials: true }
      )
      .pipe(catchError(errorHandler));
  }

  updateUser(
    id: string,
    name: string,
    lastName: string,
    userName: string,
    password: string,
    job: string
    // salary: number,
    // businesses: Array<Business>,
    // expenses: Array<number>,
    // picture: string
  ) {
    return this.httpClient
      .patch<{
        id: string;
        name: string;
        lastName: string;
        userName: string;
        password: string;
        job: string;
        // salary: number;
        // businesses: Array<Business>;
        // expenses: Array<number>;
        // picture: string;
      }>(
        environment.URL + '/users/' + id,
        {
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
          job: job,
          // salary: salary,
          // businesses: businesses,
          // expenses: expenses,
          // picture: picture,
        },
        { withCredentials: true }
      )
      .pipe(catchError(errorHandler));
  }

  getUserById(userId: string) {
    return this.httpClient
      .get<User>(environment.URL + '/users/' + userId)
      .pipe(catchError(errorHandler));
  }

  getAllUsers() {
    return this.httpClient
      .get<User[]>(environment.URL + '/users')
      .pipe(catchError(errorHandler));
  }

  addNewUser(
    name: string,
    lastName: string,
    userName: string,
    password: string,
    job: string,
    salary: number,
    businesses: Array<Business>,
    expenses: Array<number>,
    picture: string
  ) {
    return this.httpClient
      .post<{
        id: string;
        name: string;
        lastName: string;
        userName: string;
        password: string;
        job: string;
        salary: number;
        businesses: Array<Business>;
        expenses: Array<number>;
        picture: string;
      }>(
        environment.URL + '/users',
        {
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
          job: job,
          salary: salary,
          businesses: businesses,
          expenses: expenses,
          picture: picture,
        },
        { withCredentials: true }
      )
      .pipe(catchError(errorHandler));
  }

  deleteUser(id: string) {
    return this.httpClient
      .delete<{ id: string }>(environment.URL + '/users/' + id, {
        withCredentials: true,
      })
      .pipe(catchError(errorHandler));
  }

  //BUSINESSES

  getAllbusinesses() {
    return this.httpClient
      .get<Business[]>(environment.URL + '/users/businesses', {
        withCredentials: true,
      })
      .pipe(catchError(errorHandler));
  }

  addNewBusiness(userId: string, businessName: string, income: number) {
    console.log(userId) //lepo loguje
    return this.httpClient
      .patch<{ //ovamo je bio POST !!!!!!!!!!!! to je bila greska !! ahahhahhahaa idemo bre
        userId: string;
        businessName: string;
        income: number;
      }>(
        environment.URL + '/users/addBusiness/' + userId,
        {
          businessName: businessName,
          income: income,
        },
        { withCredentials: true }
      )
      .pipe(catchError(errorHandler));
  }

  deleteBusiness(userId: string, businessName: string) {
    console.log(businessName);// uspeo sam da ga logujem
    return this.httpClient
      .patch<{
         userId: string,
         businessName: string 
        }>(
          environment.URL + '/users/deleteBusiness/' + userId + '/' + businessName,
        {
          withCredentials: true,
        }
      )
      .pipe(catchError(errorHandler));
  }
}

const errorHandler = (error: HttpErrorResponse) => {
  const errorMessage =
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}`;

  return throwError(errorMessage);
};
