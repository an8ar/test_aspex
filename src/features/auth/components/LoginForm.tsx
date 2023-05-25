import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import authApi from '~/api/auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { useAppDispatch, useAppSelector } from '~/store';

import { login } from '../authSlice';

type FormValuesProps = {
  login: string;
  password: string;
  afterSubmit?: string;
};

export function LoginForm() {
  const [loginR] = authApi.endpoints.login.useMutation();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.usersSlice.users);
  const dispatch = useAppDispatch();
  const LoginSchema = Yup.object().shape({
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    login: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // await loginR(data).unwrap(); imitation of login
      const user = users.find((item) => item.login === data.login);

      if (user) {
        const isValid = user.password === data.password;
        if (isValid) {
          dispatch(login({ ...data, number: '' }));
          navigate('/dashboard');
        } else {
          toast.error('Password is incorrect');
        }
      } else {
        toast.error('Login does not exists');
      }
    } catch (error: any) {
      if (error.status === 400 && error.data?.validationErrors?.length > 0) {
        const { path, message } = error.data.validationErrors[0];
        setError(path, { message, type: 'custom' });
        setError('afterSubmit', { message: 'Wrong credentials', type: 'custom' });
      }
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="login" label="Логин" />

        <RHFTextField name="password" label="Пароль" type="password" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Войти
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
