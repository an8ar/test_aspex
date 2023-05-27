import React from 'react';

import {
  CardActions, Typography, styled, CardContent, Button,
} from '@mui/material';

import { IAppointment } from '../types';

interface AppointmentProps{
    appointment: IAppointment
    handleClick: (appointment: IAppointment)=> void
}

export function AppointmentCard({ appointment, handleClick }:AppointmentProps) {
  const handleEdit = () => {
    handleClick(appointment);
  };

  return (

    <CardStyle>
      <CardContentStyle>
        <Typography variant="h6">
          {`${appointment.startTime}`}
        </Typography>
        <Typography variant="h6">
          {`${appointment.date}`}
        </Typography>
        <Typography variant="body2">
          {`Количество персон: ${appointment.capacity}`}
        </Typography>
      </CardContentStyle>
      <CardActionsStyle>
        <Button sx={{ color: 'black' }} onClick={handleEdit}>Редактировать</Button>
      </CardActionsStyle>
    </CardStyle>

  );
}

const CardActionsStyle = styled(CardActions)({
  display: 'flex',
  padding: '24px',
  gap: 1,
  justifyContent: 'flex-end',
});

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}));

const CardStyle = styled(CardContent)(({ theme }) => ({
  minWidth: '100%',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  padding: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(66),
  },
}));
