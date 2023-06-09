import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist';

import appointmentApi, { APPOINTMENT_API_REDUCER_KEY } from '~/api/appointment/api';
import authApi, { AUTH_API_REDUCER_KEY } from '~/api/auth/api';
import {
  appointmentReducer,
  appointmentSlice,
} from '~/features/appointment';
import { authReducer, authSlice } from '~/features/auth';

import { RESET_STATE_ACTION_TYPE } from './actions/resetState';
import { rtkQueryErrorLogger } from './middlewares/rtkQueryErrorLogger';
import { usersSlice, usersReducer } from './users-slice';

const reducers = {
  [authSlice.name]: authReducer,
  [usersSlice.name]: usersReducer,
  [appointmentSlice.name]: appointmentReducer,
  [APPOINTMENT_API_REDUCER_KEY]: appointmentApi.reducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,

};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<AppState> = (state, action) => {
  if (action.type === RESET_STATE_ACTION_TYPE) {
    // eslint-disable-next-line no-param-reassign
    state = {} as AppState;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([authApi.middleware, appointmentApi.middleware,
    rtkQueryErrorLogger,
  ]),
});

export const persistor = persistStore(store);

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
