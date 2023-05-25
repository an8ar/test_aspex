import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export interface User {
    login: string,
    number: string,
    password: string,
}

interface UsersState {
    users: User[],
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },

  },
});

export const {
  addUser,
} = usersSlice.actions;

export const usersReducer = persistReducer(
  {
    key: 'rtk:users',
    storage,
    whitelist: ['users'],
  },
  usersSlice.reducer,
);
