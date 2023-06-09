import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { TABLE_CAPACITIES, TIME_SLOTS } from '~/constants';
import { IAppointment } from '~/features/appointment';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabsProps {
    appointments: IAppointment[],
    time: string,
    setAppointmentTime: React.Dispatch<React.SetStateAction<string>>,
    setAppointmentCapacity: React.Dispatch<React.SetStateAction<number>>
}

export function CapacityTabs({
  appointments,
  setAppointmentTime, setAppointmentCapacity, time,
}: TabsProps) {
  const [tabIndex, setTabIndex] = useState(0);

  const [availableSlots, setAvailableSlots] = useState<{time: string}[]>([]);

  useEffect(() => {
    changeAvailableSlots(tabIndex);
  }, [appointments]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    changeAvailableSlots(newValue);
    setAppointmentCapacity(TABLE_CAPACITIES[newValue]);
  };

  const changeAvailableSlots = (index:number) => {
    const capacityAppointments = appointments
      .filter((appointment) => appointment.capacity === TABLE_CAPACITIES[index]);
    const available = TIME_SLOTS
      .filter((timeSlot) => !capacityAppointments
        .some((appointment) => appointment.startTime === timeSlot.time));

    setTabIndex(index);

    setAvailableSlots(available);
  };

  const handleClick = (itemTime: string) => {
    setAppointmentTime(itemTime);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
        >
          {TABLE_CAPACITIES.map((capacity) => (
            <Tab
              label={`${capacity} местный`}
              key={`${capacity}-capacity-of-table`}
              {...a11yProps(capacity)}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        {TABLE_CAPACITIES.map((capacity, index) => (
          <TabPanel
            value={tabIndex}
            index={index}
            key={`${capacity}-capacity-table- info`}
          >
            {availableSlots ? availableSlots.map((item) => (
              <Button
                key={`button-for-${item.time}`}
                variant={time === item.time ? 'contained' : 'outlined'}
                onClick={() => handleClick(item.time)}
              >
                {item.time}
              </Button>

            ))
              : <Typography>Нету мест</Typography>}
          </TabPanel>
        ))}
      </Box>

    </Box>
  );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
      <Box sx={{
        display: 'flex', flexWrap: 'wrap', gap: 2, m: 1,
      }}
      >
        {children}
      </Box>
      )}
    </div>
  );
}
