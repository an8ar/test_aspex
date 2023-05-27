import { Tables } from '~/constants';
import { apiBuilder } from '~/utils/apiBuilder';

export function getTables() {
  return apiBuilder('/appointments', Tables);
}
