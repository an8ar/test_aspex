import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { APPOINTMENTS } from '~/data';
import { IAppointment } from '~/features/appointment';
import { apiBuilder } from '~/utils/api-builder';

export const APPOINTMENT_API_REDUCER_KEY = 'appointmentApi';

const appointmentApi = createApi({
  reducerPath: APPOINTMENT_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getAppointments: builder.query<IAppointment[], void>({
      queryFn: async () => ({ data: await getAppointments() as IAppointment[] }),
    }),
  }),
});

export function getAppointments() {
  return apiBuilder('/appointments', APPOINTMENTS);
}

export default appointmentApi;
