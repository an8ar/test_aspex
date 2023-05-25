import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as TimePick } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  defaultValue: string
  setEditTime: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export function TimePicker({ defaultValue, setEditTime }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePick']}>
        <TimePick
          label="Controlled picker"
          defaultValue={dayjs(defaultValue)}
          onChange={(newValue) => setEditTime(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
