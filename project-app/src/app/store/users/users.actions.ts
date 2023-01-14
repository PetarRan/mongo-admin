import { createAction, props } from "@ngrx/store";
import { Business } from "src/models/business.model";
import { User } from "src/models/user.model";


export const updateUser = createAction(
    'Update user',

    props<{
        id: string;
        name: string;
        lastName: string;
        userName: string;
        password: string;
        job: string;
        // salary: number;
        // businesses : Array<Business>;
        // expenses : Array<number>;
        // picture: string;
        }>()
);

export const updateUserSuccess = createAction (
    'Update user success',
    props<{
        id: string;
        name: string;
        lastName: string;
        userName: string;
        password: string;
        job: string;
        // salary: number;
        // businesses : Array<Business>;
        // expenses : Array<number>;
        // picture: string;
    }>()
);

export const addNewUser = createAction(
    'Add new user',
    props<{
        name: string;
        lastName: string;
        userName: string;
        password: string;
        job: string;
        salary: number;
        businesses : Array<Business>;
        expenses : Array<number>;
        picture: string;
    }>()
);

export const addNewUserSuccess = createAction(
    'Add new user success',
    props<{
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
    }>()
);
export const loadUserById = createAction('Load user by id', props<{ userId: string}>());
export const loadUserByIdSuccess = createAction('Load user by id success', props<{ user: User}>());
export const loadUsers = createAction('Load users');
export const loadUsersSuccess = createAction('Load users success', props<{ users: User[]}>());
export const selectUser = createAction(
    'Select user',
    props<{ userId: string}>()
);

export const deselectUser = createAction('Deselect user');
export const deleteUser = createAction(
    'Delete user',
    props<{
        id: string
    }>()
);
export const deleteUserSuccess = createAction(
    'Delete user success',
    props<{
        id: string;
    }>()
);

export const addNewBusiness = createAction(
    'Add new business',
    props<{
        userId: string;
        businessName: string;
        income: number;
    }>()
);
export const addNewBusinessSuccess = createAction(
    'Add new business success',
    props<{
        userId: string;
        businessName: string;
        income: number;
    }>()
);

export const loadBusinesses = createAction('Load businesses');
export const loadBusinessesSuccess = createAction('Load businesses success', props<{ businesses: Business[]}>());
export const selectBusiness = createAction(
    'Select business',
    props<{ businessName: string}>()
);

export const deselectBusiness = createAction('Deselect business');
export const deleteBusiness = createAction(
    'Delete business',
    props<{
        userId: string;
        businessName: string;
    }>()
);
export const deleteBusinessSuccess = createAction(
    'Delete business success',
    props<{
        userId: string;
        businessName: string;
    }>()
);
export const login = createAction(

    'Login',
  
    props<{
  
      username: string;
  
      password: string;
  
    }>()
  
  );
  export const loginSuccess = createAction('Login success',  );