import React, { useState } from 'react';

import {
  Box, Chip,
} from '@mui/material';
import moment from 'moment';

import { IAppointment } from '../types';
import { EditForm } from './edit-form';

interface EditProps{
  appointment: IAppointment
}

export function AppointmentEdit({ appointment }:EditProps) {
  const date = moment(appointment.date).format('LL');
  const hours = moment(appointment.date).format('LLL').split(' ')[3];
  const [edit, setEdit] = useState(false);

  const handleClick = () => {
    setEdit(true);
  };

  return (
    <Box>
      <Box sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Chip label={date} color="secondary" />
          <Chip label={hours} color="secondary" />
          <Chip label={`${appointment.capacity} Гостей`} color="secondary" />
        </Box>
        <Chip label="Редактировать" onClick={handleClick} />
      </Box>

      {edit && <EditForm appointment={appointment} />}
    </Box>
  );
}
