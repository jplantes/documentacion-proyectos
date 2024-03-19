

export interface User {
  email: string;
  password: string;
  displayName: string;
}


export interface Users {
  id: string;
  data: UserRole;
}

export interface UserRole {
  name: string;
  email: string;
  proyect: string[];
  typeUser: string[];
  isAdmin: boolean;
}



export enum UserType {
  DEV = 'dev',
  QA = 'qa',
}
