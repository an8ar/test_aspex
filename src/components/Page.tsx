import React from 'react';

import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { APPLICATION_NAME } from '~/config';

type Props = {
  children: React.ReactNode;
  meta?: React.ReactNode;
  title: string;
};

export function Page({ children, meta, title }: Props) {
  return (
    <>
      <Helmet>
        <title>{`${title} | ${APPLICATION_NAME}`}</title>
        {meta}
        <style>{'body { background-color: #F4F6F8; }'}</style>
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Typography variant="h4" sx={{ m: 3 }}>ASPEX logo (navbar)</Typography>
        </Box>
        {children}
      </Box>
    </>
  );
}
