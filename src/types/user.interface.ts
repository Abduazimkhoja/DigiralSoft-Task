export interface IUser {
  id: string;
  name: string;
  lastName: string;
  avatar: string;
  createdAt: string;
}

export interface IUsersState {
  users: IUser[];
  currentUser: IUser | null;
  loading: boolean;
  error: string | null;
}