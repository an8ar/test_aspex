import React from 'react';

import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Page } from '~/components/page';
import { Dashboard } from '~/features/dashboard';
import { useAppSelector } from '~/store';

export function DashboardPage() {
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.usersSlice.users);

  return (
    <Page title="DashboardPage">
      <Container sx={{
        paddingTop: '12px',
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      >
        <Dashboard />

      </Container>
    </Page>
  );
}
