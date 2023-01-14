import { Business } from "./business.model";

export interface User  {
    //forEach(arg0: (i: any) => void);
    id: string;
    name: string;
    lastName: string;
    userName: string;
    password: string;
    job: string;
    salary: number;
    businesses : Array<Business>;
    expenses : Array<number>;
    picture: string;
}
