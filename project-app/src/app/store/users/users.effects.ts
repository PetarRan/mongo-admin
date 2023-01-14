import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, mergeMapTo } from 'rxjs/operators';
// import { User } from "serverNJS/nestjs-project/src/users/user.model";
import { User } from 'src/models/user.model';
import { Business } from 'src/models/business.model';
import { UsersService } from 'src/app/services/users.service';
import * as actions from '../users/users.actions';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class UsersEffects {
  constructor(private usersService: UsersService, private actions$: Actions) {}

  loadUsersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUsers),
      mergeMap(() =>
        this.usersService.getAllUsers().pipe(
          map((users: User[]) => actions.loadUsersSuccess({ users: users })),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );
  loadUserByIdEffect$  = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.loadUserById),
    mergeMap((user) =>
      this.usersService.getUserById(user.userId).pipe(
        map((user) => actions.loadUserByIdSuccess({ user: user })),
        catchError(() => of({ type: 'load error' }))
      )
    )
  )
);
  updateUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateUser),
      mergeMap((user) =>
        this.usersService
          .updateUser(
            user.id,
            user.name,
            user.lastName,
            user.userName,
            user.password,
            user.job,
            // user.salary,
            // user.businesses,
            // user.expenses,
            // user.picture
          )
          .pipe(
            map(() =>
              actions.updateUserSuccess({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                userName: user.userName,
                password: user.password,
                job: user.job,
              })
            ),
            catchError(() => of({ type: 'update error' }))
          )
      )
    )
  );

  addNewUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addNewUser),
      mergeMap((user) =>
        this.usersService
          .addNewUser(
            user.name,
            user.lastName,
            user.userName,
            user.password,
            user.job,
            user.salary,
            user.businesses,
            user.expenses,
            user.picture
          )
          .pipe(
            map((newUser) =>
              actions.addNewUserSuccess({
                id: newUser.id,
                name: newUser.name,
                lastName: newUser.lastName,
                userName: newUser.userName,
                password: newUser.password,
                job: newUser.job,
                salary: newUser.salary,
                businesses: newUser.businesses,
                expenses: newUser.expenses,
                picture: newUser.picture,
              })
            ),
            catchError(() => of({ type: 'add error' }))
          )
      )
    )
  );

  deleteUserEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteUser),
      mergeMap(
        (
          user: any //ovamo bi trebalo user : User, ali nesto nece
        ) =>
          this.usersService.deleteUser(user.id).pipe(
            map((deletedUserId) =>
              actions.deleteUserSuccess({ id: deletedUserId.id })
            ),
            catchError(() => of({ type: 'delete error' }))
          )
      )
    )
  );

  //BUSINESSES

  loadBusinessesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadBusinesses),
      mergeMap(() =>
        this.usersService.getAllbusinesses().pipe(
          map((businesses) =>
            actions.loadBusinessesSuccess({ businesses: businesses })
          ),
          catchError(() => of({ type: 'load error' }))
        )
      )
    )
  );

  addNewBusinessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addNewBusiness),
      mergeMap((business) =>
        this.usersService
          .addNewBusiness(
            business.userId,
            business.businessName,
            business.income
          )
          .pipe(
            map(() =>
              actions.addNewBusinessSuccess({
                userId: business.userId,
                businessName:  business.businessName,
                income: business.income,
              })
            ),
            catchError(() => of({ type: 'add business error' }))
          )
      )
    )
  );

  deleteBusinessEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteBusiness),
      mergeMap(
        (
          business: any //ovamo bi trebalo user : User, ali nesto nece
        ) =>
          this.usersService.deleteBusiness(business.userId, business.businessName).pipe(
            map((deletedBusinessName) =>
              actions.deleteBusinessSuccess({
                userId: deletedBusinessName.userId,
                businessName: deletedBusinessName.businessName,
              })
            ),
            catchError(() => of({ type: 'delete error' }))
          )
      )
    )
  );

  loginEffect$ = createEffect(() =>

  this.actions$.pipe(

    ofType(actions.login),

    mergeMap((credentials: { username: string; password: string }) => {

      console.log('efekat');

      return this.usersService

        .login(credentials.username, credentials.password)

        .pipe(

          map((data:HttpResponse<{access_token: string}>) => {

            if (data.body != null) {
              // console.log(JSON.stringify(data.body.access_token));
              localStorage.setItem('access_token', JSON.stringify(data.body.access_token)) 
            }
             return actions.loginSuccess();

          }),

          catchError(() => of({ type: 'login error' }))

        );

    })

  )

);

}
