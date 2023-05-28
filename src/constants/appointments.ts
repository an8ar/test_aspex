import { IAppointment } from '~/features/appointment';

export const APPOINTMENTS: IAppointment[] = [
  {
    date: '2023-05-28',
    startTime: '14:00',
    appointmentId: 123,
    clientLogin: 'an8ar',
    capacity: 2,
  },
  {
    date: '2023-05-27',
    startTime: '15:00',
    appointmentId: 124,
    clientLogin: 'janedoe',
    capacity: 2,
  },
  {
    date: '2023-05-27',
    startTime: '12:00',
    appointmentId: 213,
    clientLogin: 'an8ar',
    capacity: 2,
  },
  {
    date: '2023-05-27',
    startTime: '18:00',
    appointmentId: 987,
    clientLogin: 'an8ar',
    capacity: 2,
  },
  {
    date: '2023-05-28',
    startTime: '16:00',
    appointmentId: 789,
    clientLogin: 'an8ar',
    capacity: 2,
  },
  {
    date: '2023-05-28',
    startTime: '13:00',
    appointmentId: 456,
    clientLogin: 'an8ar',
    capacity: 2,
  },
];

export const APPOINTMENT_IDS = [123, 124, 213, 987, 789, 456];
