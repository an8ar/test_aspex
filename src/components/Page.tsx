import React from 'react';

import { Box, Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { APPLICATION_NAME } from '~/config';
import { logout } from '~/features/auth';
import { useAuth } from '~/hooks/useAuth';
import { useAppDispatch } from '~/store';

type Props = {
  children: React.ReactNode;
  meta?: React.ReactNode;
  title: string;
};

export function Page({ children, meta, title }: Props) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>{`${title} | ${APPLICATION_NAME}`}</title>
        {meta}
        <style>{'body { background-color: #F4F6F8; }'}</style>
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          bgcolor: 'white',
        }}
        >
          <Typography variant="h4" sx={{ m: 3 }}>ASPEX logo (navbar)</Typography>
          {!isLoggedIn ? (
            <Box>
              <Button onClick={handleLogin}>Войти</Button>
              <Button onClick={handleRegister}>Регистрация</Button>
            </Box>
          ) : (
            <Box>
              <Button onClick={handleLogout}>Выйти</Button>
            </Box>
          )}

        </Box>
        {children}
      </Box>
    </>
  );
}
