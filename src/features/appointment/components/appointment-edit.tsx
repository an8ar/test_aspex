import React, { useState } from 'react';

import {
  Box, Chip,
} from '@mui/material';
import moment from 'moment';

import { useAppDispatch } from '~/store';

import { updateAppointment } from '../appoitment-slice';
import { IAppointment } from '../types';
import { AppointmentForm } from './appointment-form';

interface EditProps{
  appointment: IAppointment
  handleClose: ()=> void
}

export function AppointmentEdit({ appointment, handleClose }:EditProps) {
  const appointmentDate = moment(appointment.date).format('LL');
  const dispatch = useAppDispatch();

  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };
  const handleSubmit = (date:string, startTime: string, capacity: number) => {
    const { appointmentId, clientLogin } = appointment;
    dispatch(updateAppointment({
      date, startTime, capacity, appointmentId, clientLogin,
    }));
    handleClose();
  };

  return (
    <Box>
      <Box sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Chip label={appointmentDate} color="secondary" />
          <Chip label={appointment.startTime} color="secondary" />
          <Chip label={`Столик на ${appointment.capacity}`} color="secondary" />
        </Box>
        <Chip label="Редактировать" onClick={handleClick} />
      </Box>

      {edit && <AppointmentForm date={appointment.date} handleSubmit={handleSubmit} />}
    </Box>
  );
}
