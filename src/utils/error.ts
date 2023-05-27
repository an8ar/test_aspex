import { toast } from 'react-toastify';

export const handleAPIError = (err: any) => {
  if (err.status === 400 && err.data?.validation) {
    toast.error(err.data?.validation);
  }
};
