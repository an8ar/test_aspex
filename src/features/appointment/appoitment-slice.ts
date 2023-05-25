import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { APPOINTMENTS } from '~/constants';

import { IAppointment } from './types';

interface ISliceState {
  appointments: IAppointment[];
}

const initialState: ISliceState = {
  appointments: APPOINTMENTS,
};

export const appointmentSlice = createSlice({
  name: 'appointmentSlice',
  initialState,
  reducers: {
    makeAppointment(state, action: PayloadAction<IAppointment>) {
      state.appointments.find((appointment) => appointment.date === action.payload.date);
    },

  },
});

export const { makeAppointment } = appointmentSlice.actions;

export const appointmentReducer = persistReducer(
  {
    key: 'rtk:dashboard',
    storage,
    whitelist: ['appointments'],
  },
  appointmentSlice.reducer,
);
