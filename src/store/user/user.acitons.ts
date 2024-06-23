import { UserService } from '@/services/user.service';
import { IUser } from '@/types/user.interface';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  UserService.getAll,
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  UserService.getById,
);

export const creteUser = createAsyncThunk(
  'users/editUserById',
  UserService.create,
);

export const editUserById = createAsyncThunk(
  'users/editUserById',
  UserService.update,
);

export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  UserService.delete,
);
