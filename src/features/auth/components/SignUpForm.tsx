import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import authApi from '~/api/auth/api';
import { FormProvider, RHFTextField } from '~/components/hook-form';
import { useAppDispatch } from '~/store';
import { addUser } from '~/store/users-slice';

type FormValuesProps = {
  number: string;
  login: string;
  password: string;
  afterSubmit?: string;
};

export function SignUpForm() {
  const [signUp] = authApi.endpoints.signUp.useMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
    number: Yup.string().required('Number is required'),
    login: Yup.string().required('Login is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    number: '',
    login: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues,
  });

  const {
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      // await signUp(data).unwrap(); here we just imitate, but i will store the date in a store
      dispatch(addUser(data));

      navigate('/login');
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
        <RHFTextField name="number" label="Сотовый телефон" />
        <RHFTextField name="password" label="Пароль" type="password" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Зарегестрироваться
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
