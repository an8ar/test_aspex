import React from 'react';

import { Box } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { AppointmentCreate } from '~/features/appointment';
import { useResponsive } from '~/hooks/useResponsive';

interface Props {
    handleClose: (type: 'edit'| 'create')=>void,
    open: boolean
    handleOpen: (type: 'edit'| 'create')=>void,

}

export function ModalCreate({
  handleClose, handleOpen, open,
}:Props) {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box>
      {isMobile
        ? (
          <BottomDrawer
            onClose={() => handleClose('create')}
            onOpen={() => handleOpen('create')}
            title="Забронировать столик"
            hasCloser
            open={open}
            fullHeight
          >
            <AppointmentCreate handleClose={() => handleClose('create')} />

          </BottomDrawer>
        ) : (
          <DialogForm
            open={open}
            title="Забронировать столик"
            hasCloser
            onClose={() => handleClose('create')}
            onOpen={() => handleOpen('create')}
          >
            <AppointmentCreate handleClose={() => handleClose('create')} />

          </DialogForm>
        )}
    </Box>
  );
}
