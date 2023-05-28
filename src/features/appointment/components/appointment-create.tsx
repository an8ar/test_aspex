import React from 'react';

import {
  Box,
} from '@mui/material';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '~/store';

import { makeAppointment } from '../appoitment-slice';
import { AppointmentForm } from './appointment-form';

interface CreateProps{
  handleClose: ()=> void
}

export function AppointmentCreate({ handleClose }:CreateProps) {
  const appointmentDate = dayjs().format('YYYY-MM-DD');
  const dispatch = useAppDispatch();
  const clientLogin = useAppSelector((state) => state.authSlice.user?.login);

  const handleSubmit = (date:string, startTime: string, capacity: number) => {
    if (clientLogin) {
      dispatch(makeAppointment({
        date, startTime, capacity, clientLogin,
      }));
    } else {
      toast.error('Something is wrong, client login does not exists');
    }
    handleClose();
  };

  return (
    <Box>
      <AppointmentForm date={appointmentDate} handleSubmit={handleSubmit} />
    </Box>
  );
}
