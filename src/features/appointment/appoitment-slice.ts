import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appointmentApi from '~/api/appointment/api';
import { getRandomNumber } from '~/utils/get-random-number';

import { IAppointment } from './types';

interface ISliceState {
  appointments: IAppointment[];
}

const initialState: ISliceState = {
  appointments: [],
};

export const appointmentSlice = createSlice({
  name: 'appointmentSlice',
  initialState,
  reducers: {
    makeAppointment(state, action: PayloadAction<Omit<IAppointment, 'appointmentId'>>) {
      while (true) {
        const randomId = getRandomNumber(0, 10000);
        const idExists = state.appointments.some((appointment) => appointment.id === randomId);
        if (!idExists) {
          state.appointments.push({ ...action.payload, id: randomId });
          break;
        }
      }
    },
    updateAppointment(state, action: PayloadAction<IAppointment>) {
      const appointmentIndex = state.appointments
        .findIndex((appointment) => appointment.id === action.payload.id);
      if (appointmentIndex === -1) {
        toast.info('Резерв не найден');
      } else {
        state.appointments[appointmentIndex] = action.payload;
      }
    },
    deleteAppointment(state, action: PayloadAction<IAppointment>) {
      state.appointments = state.appointments
        .filter((appointment) => appointment.id !== action.payload.id);
    },
  },
  extraReducers: (build) => {
    build.addMatcher(
      appointmentApi.endpoints.getAppointments.matchFulfilled,
      (state, { payload }) => {
        if (state.appointments.length === 0) {
          state.appointments = payload;
        }
      },
    );
  },
});

export const { makeAppointment, updateAppointment, deleteAppointment } = appointmentSlice.actions;

export const appointmentReducer = persistReducer(
  {
    key: 'rtk:dashboard',
    storage,
    whitelist: ['appointments', 'appointmentIds'],
  },
  appointmentSlice.reducer,
);
