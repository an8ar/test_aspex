import React, { useEffect } from 'react';

import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { IAppointment } from '~/features/appointment';
import { useAppSelector } from '~/store';

interface Props{
  defaultValue: string,
  setDateAppointments: React.Dispatch<React.SetStateAction<IAppointment[] >>,
  setAppointmentDate: React.Dispatch<React.SetStateAction<string>>
}

export function DatePicker({ defaultValue, setDateAppointments, setAppointmentDate }:Props) {
  const appointments = useAppSelector((state) => state.appointmentSlice.appointments);
  useEffect(() => {
    setDateAppointments(getDateAppointments(defaultValue));
  }, []);

  const handleChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      setDateAppointments(getDateAppointments(newValue.format('YYYY-MM-DD')));
    }
  };

  const getDateAppointments = (date: string): IAppointment[] => {
    setAppointmentDate(date);
    return appointments
      .filter((appointment) => dayjs(appointment.date).format('YYYY-MM-DD') === date);
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <Picker
            label="Выберите дату"
            defaultValue={dayjs(defaultValue)}
            onChange={handleChange}
            minDate={dayjs()}
            sx={{
              zIndex: 100000,
            }}

          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>

  );
}
