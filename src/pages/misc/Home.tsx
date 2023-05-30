import React from 'react';

import { Container, Typography } from '@mui/material';

import { Page } from '~/components/page';

export function HomePage() {
  return (
    <Page title="Homepage">
      <Container sx={{
        paddingTop: '12px',
        gap: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
      >
        <Typography variant="h4">
          Онлайн бронирование столиков ресторана
        </Typography>
        <Typography variant="h6">
          Для бронирования войдите или зарегестрируйтесь
        </Typography>
        <Typography variant="body1">
          зарегестрируйтесь по логину an8ar, будут сразу доступны некоторые брони
        </Typography>

      </Container>
    </Page>
  );
}
