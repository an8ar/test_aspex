import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '..';
import {
  LoginResponse,
  LoginRequest,
  SignUpRequest,
  SignUpResponse,
} from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => ({
        url: '/signup/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export default authApi;