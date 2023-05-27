import React, { useState } from 'react';

import {
  Stack, styled, Button,
} from '@mui/material';

import { getAppointments } from '~/api/appointment/appointmentApi';
import { DatePicker } from '~/components/date-picker';
import { CapacityTabs } from '~/features/table';

import { IAppointment } from '../types';

interface Props{
appointment: IAppointment
}

export function EditForm({ appointment }:Props) {
  const [dateAppointments, setDateAppointments] = useState<IAppointment[]>([]);
  console.log(dateAppointments);
  const handleReBook = async () => {
    const appointments = await getAppointments();
    console.log(appointments);
  };

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center' }}>

      <DatePickerStyle
        defaultValue={appointment.date}
        setDateAppointments={setDateAppointments}
      />
      <CapacityTabs appointments={dateAppointments} />

      <Button
        onClick={handleReBook}
      >
        Перебронировать
      </Button>

    </Stack>
  );
}

const DatePickerStyle = styled(DatePicker)(({ theme }) => ({
  zIndex: 4,
}));
