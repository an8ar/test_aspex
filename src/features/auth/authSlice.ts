import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { User } from '~/store';

import type { AuthState } from './types';

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },

});

export const { logout, login } = authSlice.actions;

export const authReducer = persistReducer(
  {
    key: 'rtk:auth',
    storage,
    whitelist: ['user', 'isLoggedIn'],
  },
  authSlice.reducer,
);
