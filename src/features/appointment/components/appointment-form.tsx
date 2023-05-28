import React, { useState } from 'react';

import {
  Stack, styled, Button,
} from '@mui/material';
import dayjs from 'dayjs';

import { DatePicker } from '~/components/date-picker';
import { CapacityTabs } from '~/features/table';

import { IAppointment } from '../types';

interface Props{
date: string
handleSubmit: (date:string, time: string, capacity: number)=>void
}

export function AppointmentForm({ date, handleSubmit }:Props) {
  const [dateAppointments, setDateAppointments] = useState<IAppointment[]>([]);

  const [appointmentDate, setAppointmentDate] = useState(dayjs().format('YYYY-MM_DD'));
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentCapacity, setAppointmentCapacity] = useState(2);

  const handleReBook = async () => {
    handleSubmit(appointmentDate, appointmentTime, appointmentCapacity);
  };

  return (
    <Stack spacing={2} sx={{ justifyContent: 'center' }}>

      <DatePickerStyle
        defaultValue={date}
        setDateAppointments={setDateAppointments}
        setAppointmentDate={setAppointmentDate}
      />
      <CapacityTabs
        appointments={dateAppointments}
        time={appointmentTime}
        setAppointmentTime={setAppointmentTime}
        setAppointmentCapacity={setAppointmentCapacity}
      />

      <Button
        onClick={handleReBook}
      >
        Подтвердить
      </Button>

    </Stack>
  );
}

const DatePickerStyle = styled(DatePicker)(({
  zIndex: 4,
}));
