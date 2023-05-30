import React from 'react';

import {
  CardActions, Typography, styled, CardContent, Button, Box,
} from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch } from '~/store';

import { deleteAppointment } from '../appoitment-slice';
import { IAppointment } from '../types';

interface AppointmentProps{
    appointment: IAppointment
    handleEditClick: (appointment: IAppointment)=> void
}

export function AppointmentCard({ appointment, handleEditClick }:AppointmentProps) {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    handleEditClick(appointment);
  };
  const handleDelete = () => {
    dispatch(deleteAppointment(appointment));
    toast.success('Бронирование успешно удалилось');
  };

  return (

    <CardStyle>
      <CardContentStyle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="h6">
            {`Дата: ${appointment.date}`}
          </Typography>
          <Typography variant="h6">
            {`Время: ${appointment.startTime}`}
          </Typography>
        </Box>
        <Typography variant="body2">
          {`Cтолик на: ${appointment.capacity}`}
        </Typography>
      </CardContentStyle>
      <CardActionsStyle>
        <Box>
          <Button sx={{ color: 'black' }} onClick={handleEdit}>Редактировать</Button>
          <Button sx={{ color: 'red' }} onClick={handleDelete}>Удалить</Button>

        </Box>
      </CardActionsStyle>
    </CardStyle>

  );
}

const CardActionsStyle = styled(CardActions)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
}));

const CardStyle = styled(CardContent)(({ theme }) => ({
  minWidth: '100%',
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    minWidth: theme.spacing(66),
  },
}));
