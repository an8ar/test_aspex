import React from 'react';

import { Box } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { Dialog } from '~/components/dialog';
import { IAppointment, AppointmentEdit } from '~/features/appointment';
import { useResponsive } from '~/hooks/useResponsive';

interface Props {
    handleClose: ()=>void,
    open: boolean
    modalAppointment: IAppointment
    handleOpen: ()=>void,

}

export function AppointmentEditModal({
  handleClose, modalAppointment, handleOpen, open,
}:Props) {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box>
      {isMobile
        ? (
          <BottomDrawer
            onClose={handleClose}
            onOpen={handleOpen}
            title="Редактировать бронирование"
            hasCloser
            open={open}
            fullHeight
          >
            {modalAppointment?.clientLogin }
            {modalAppointment && (
              <AppointmentEdit
                handleClose={handleClose}
                appointment={modalAppointment}
              />
            )}

          </BottomDrawer>
        ) : (
          <Dialog
            open={open}
            title="Редактировать бронирование"
            hasCloser
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {modalAppointment?.clientLogin }
            {modalAppointment && (
              <AppointmentEdit
                handleClose={handleClose}
                appointment={modalAppointment}
              />
            )}
          </Dialog>
        )}
    </Box>
  );
}
