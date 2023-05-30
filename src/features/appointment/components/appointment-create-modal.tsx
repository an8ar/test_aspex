import React from 'react';

import { Box } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { Dialog } from '~/components/dialog';
import { AppointmentCreate } from '~/features/appointment';
import { useResponsive } from '~/hooks/useResponsive';

interface Props {
    handleClose: ()=>void,
    open: boolean
    handleOpen: ()=>void,

}

export function AppointmentCreateModal({
  handleClose, handleOpen, open,
}:Props) {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box>
      {isMobile
        ? (
          <BottomDrawer
            onClose={handleClose}
            onOpen={handleOpen}
            title="Забронировать столик"
            hasCloser
            open={open}
            fullHeight
          >
            <AppointmentCreate handleClose={handleClose} />

          </BottomDrawer>
        ) : (
          <Dialog
            open={open}
            title="Забронировать столик"
            hasCloser
            onClose={handleClose}
            onOpen={handleOpen}
          >
            <AppointmentCreate handleClose={handleClose} />

          </Dialog>
        )}
    </Box>
  );
}
