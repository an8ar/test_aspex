import React, { useState } from 'react';

import { Stack, Typography, styled } from '@mui/material';
import { Dayjs } from 'dayjs';
import moment from 'moment';

import { DatePicker } from '~/components/date-picker';
import { TimePicker } from '~/components/time-picker';

import { IAppointment } from '../types';

interface Props{
appointment: IAppointment
}

export function EditForm({ appointment }:Props) {
  const date = moment(appointment.date).format('MM/DD/YYYY');
  const hours = moment(appointment.date).format('LLL');

  const [editedDate, setEditedDate] = useState<Dayjs|null>(null);

  const [editTime, setEditTime] = useState<Dayjs|null>(null);
  console.log(editedDate, editTime);
  return (
    <Stack spacing={2}>
      <Typography>
        {date}
        {hours}
      </Typography>

      <DatePickerStyle
        defaultValue={appointment.date}
        setEditedDate={setEditedDate}
      />
      <TimePicker
        defaultValue={appointment.date}
        setEditTime={setEditTime}
      />

    </Stack>
  );
}

const DatePickerStyle = styled(DatePicker)(({ theme }) => ({
  zIndex: 4,
}));
