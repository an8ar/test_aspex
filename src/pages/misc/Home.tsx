import React from 'react';

import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Page } from '~/components/Page';
import { useAppSelector } from '~/store';

export function HomePage() {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.usersSlice.users);
  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <Page title="Homepage">
      <Container sx={{
        paddingTop: '12px',
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      >
        <Button variant="outlined" onClick={handleLogin}>Логин</Button>
        <Button onClick={handleSignUp}>Регистрация</Button>

      </Container>
    </Page>
  );
}
