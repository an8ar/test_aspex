import React from 'react';

import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface Props{
  defaultValue: string
  setEditedDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

export function DatePicker({ defaultValue, setEditedDate }:Props) {
  return (
    <Box sx={{ }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <Picker
            label="Выберите дату"
            defaultValue={dayjs(defaultValue)}
            onChange={(newValue) => setEditedDate(newValue)}
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
