import { createSelector } from "@ngrx/store";
import { AppState } from "../app-state";
import {  UsersState } from "./users.reducers";
import { User } from "src/models/user.model";
import { Business } from "src/models/business.model";
import { selectUser } from "./users.actions";


export const selectUserFeature = createSelector(
    (state: AppState) => state.users,
    (users) => users,
);

// export const selectBusinessFeature = createSelector(
//     (state: AppState) => state.businesses,
//     (businesses) => businesses,
// );


export const selectAllUsers = createSelector(
    selectUserFeature,
    (state: UsersState) =>
        Object.values(state.entities)
        .filter((user) => user != null)
        .map((user):User => ({
            id: user!.id,
            name: user!.name,
            lastName: user!.lastName,
            userName: user!.userName,
            password: user!.password,
            job: user!.job,
            salary: user!.salary,
            businesses: user!.businesses,
            expenses: user!.expenses,
            picture: user!.picture
            }
        ))
);

export const selectSelectedUserId = createSelector(
    selectUserFeature,
    (state: UsersState) => state.selectedUserId
);

export const selectAllUsersAsDictionary = createSelector(
    selectUserFeature,
    (state: UsersState) => state.entities
);

export const selectSelectedUser = createSelector(
    selectAllUsersAsDictionary,
    selectSelectedUserId,
    (allUsers, userId) => allUsers[userId]
)

//BUSINESSES

// export const selectAllBusinesses = createSelector(
//     selectUserFeature,
//     (state: UsersState) =>
//         Object.values(state.entities)
//         .filter((business) => business != null)
//         .map((business):Business => ({
//             businessName: business!.businessName,
//             income: business!.income,
            
//             }
//         ))
// );

// export const selectSelectedBusinessName = createSelector(
//     selectUserFeature,
//     (state: UsersState) => state.selectedBusinessName
// );

export const selectAllBusinessesAsDictionary = createSelector(
    selectUserFeature,
    (state: UsersState) => state.entities
);

export const selectSelectedBusiness = createSelector(
    selectAllUsersAsDictionary,
    selectSelectedUserId,
    (allBusinesses, businessName ) => allBusinesses[businessName]
);