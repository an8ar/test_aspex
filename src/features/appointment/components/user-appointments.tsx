import React from 'react';

import { Box, styled } from '@mui/material';

import { useAppSelector } from '~/store';

import { IAppointment } from '../types';
import { AppointmentCard } from './appointment-card';

interface Props {
  handleEditClick: (appointment:IAppointment)=>void
}

export function UserAppointments({ handleEditClick }:Props) {
  const user = useAppSelector((state) => state.authSlice.user);

  const appointments = useAppSelector((state) => state.appointmentSlice.appointments);

  const userAppointments = appointments
    .filter((appointment) => appointment.clientLogin === user?.login);

  return (
    <BoxStyle>
      {userAppointments.length > 0
        ? userAppointments.map((appointment) => (
          <AppointmentCard
            appointment={appointment}
            handleEditClick={handleEditClick}
            key={appointment.id}
          />
        ))
        : <Box>No appointments </Box>}

    </BoxStyle>
  );
}

const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
  padding: theme.spacing(1),
}));
