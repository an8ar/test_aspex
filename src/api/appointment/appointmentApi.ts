import { APPOINTMENTS } from '~/constants';
import { apiBuilder } from '~/utils/apiBuilder';

export function getAppointments() {
  return apiBuilder('/appointments', APPOINTMENTS);
}
