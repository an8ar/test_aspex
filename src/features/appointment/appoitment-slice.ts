import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { APPOINTMENTS, APPOINTMENT_IDS } from '~/constants';
import { getRandomNumber } from '~/utils/getRandomNumber';

import { IAppointment } from './types';

interface ISliceState {
  appointments: IAppointment[];
  appointmentIds: number[]
}

const initialState: ISliceState = {
  appointments: APPOINTMENTS,
  appointmentIds: APPOINTMENT_IDS,
};

export const appointmentSlice = createSlice({
  name: 'appointmentSlice',
  initialState,
  reducers: {
    makeAppointment(state, action: PayloadAction<Omit<IAppointment, 'appointmentId'>>) {
      while (true) {
        const randomId = getRandomNumber(0, 10000);
        if (!state.appointmentIds.includes(randomId)) {
          state.appointmentIds.push(randomId);
          state.appointments.push({ ...action.payload, appointmentId: randomId });
          break;
        }
      }
    },
    updateAppointment(state, action: PayloadAction<IAppointment>) {
      const target = state.appointments
        .findIndex((appointment) => appointment.appointmentId === action.payload.appointmentId);
      if (target >= 0) {
        state.appointments[target] = action.payload;
      } else {
        toast.info('Резерв не найден');
      }
    },
    deleteAppointment(state, action: PayloadAction<IAppointment>) {
      state.appointments = state.appointments
        .filter((appointment) => appointment.appointmentId !== action.payload.appointmentId);
      state.appointmentIds = state.appointmentIds
        .filter((id) => id !== action.payload.appointmentId);
    },

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
