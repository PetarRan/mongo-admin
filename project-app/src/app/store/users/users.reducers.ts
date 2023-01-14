import { createEntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/models/user.model';
import * as actions from '../users/users.actions';
import { Business } from 'src/models/business.model';
import { UsersService } from 'src/app/services/users.service';

export interface UsersState extends EntityState<User> {
  selectedUserId: string;
}

const adapter = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
}); //Adapter koristimo da preko njega menjamo stanje

// export interface BusinessesState extends EntityState<Business>{
//     selectedBusinessName: string,
// }
const badapter = createEntityAdapter<Business>({
  //bilo je <Business>
  selectId: (business: Business) => business.businessName,
});

const initialState: UsersState = adapter.getInitialState({
  selectedUserId: '',
});



//inicijalno stanje ce biti prvi parametar reducer-a
//zatim pravimo hendlere za svaku od akcija koje hocemo da radimo

export const userReducer = createReducer(
  initialState,
  on(actions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),
  on(actions.deselectUser, (state) => ({ ...state, selectedUserId: '' })),
  on(actions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, state)
  ),
  on(
    actions.updateUserSuccess,
    (
      state,
      {
        id,
        name,
        lastName,
        userName,
        password,
        job,
        // salary,
        // businesses,
        // expenses,
        // picture
      }
    ) => {
      const pom: Update<User> = {
        id: id,
        changes: {
          id: id,
          name: name,
          lastName: lastName,
          userName: userName,
          password: password,
          job: job,
          // salary:salary,
          // businesses:businesses,
          // expenses:expenses,
          // picture:picture
        },
      };
      return adapter.updateOne(pom, state);
    }
  ),
  on(
    actions.addNewUserSuccess,
    (
      state,
      {
        id,
        name,
        lastName,
        userName,
        password,
        job,
        salary,
        businesses,
        expenses,
        picture,
      }
    ) =>
      adapter.addOne(
        {
          id: id,
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
        state
      )
  ),
  on(actions.deleteUserSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(actions.selectBusiness, (state, { businessName }) => ({
    ...state,
    selectedBusinessName: businessName,
  })),
  on(
    actions.addNewBusinessSuccess,
    (state, { userId, businessName, income }) => {
      const pom: Update<User> = {
        id: userId,
        changes: {
          id: userId,
          businesses: [
            ...state.entities[userId]!.businesses,
            { businessName: businessName, income: income },
          ],
        },
      };
      return adapter.updateOne(pom, state);
    }
  ),
  on(actions.deleteBusinessSuccess, (state, { userId, businessName }) => {
    const pom: Update<User> = {
      id: userId,
      changes: {
        id: userId,
        businesses: state.entities[userId]!.businesses.filter(
          (x) => x.businessName !== businessName
        ),
      },
    };
    return adapter.updateOne(pom, state);
  })
);

// export const businessReducer = createReducer( initialBusinessState,

//     );
