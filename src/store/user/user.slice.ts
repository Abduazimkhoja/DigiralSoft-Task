// features/users/usersSlice.ts
import { IUser, IUsersState } from '@/types/user.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  deleteUserById,
  editUserById,
  fetchUserById,
  fetchUsers,
} from './user.acitons';

const initialState: IUsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserById.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false;
          state.currentUser = action.payload;
        },
      )
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addCase(
        editUserById.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false;
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id,
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
        },
      )
      .addCase(
        deleteUserById.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.users = state.users.filter(
            (user) => user.id !== action.payload,
          );
        },
      );
  },
});

export const { setUsers } = usersSlice.actions;
export const userReducer = usersSlice.reducer;
