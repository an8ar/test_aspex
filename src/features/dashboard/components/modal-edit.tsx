import React from 'react';

import { Box } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { IAppointment, AppointmentEdit } from '~/features/appointment';
import { useResponsive } from '~/hooks/useResponsive';

interface Props {
    handleClose: (type: 'edit'| 'create')=>void,
    open: boolean
    modalAppointment: IAppointment
    handleOpen: (type: 'edit'| 'create')=>void,

}

export function ModalEdit({
  handleClose, modalAppointment, handleOpen, open,
}:Props) {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box>
      {isMobile
        ? (
          <BottomDrawer
            onClose={() => handleClose('edit')}
            onOpen={() => handleOpen('edit')}
            title="Редактировать бронирование"
            hasCloser
            open={open}
            fullHeight
          >
            {modalAppointment?.clientLogin }
            {modalAppointment && (
              <AppointmentEdit
                handleClose={() => handleClose('edit')}
                appointment={modalAppointment}
              />
            )}

          </BottomDrawer>
        ) : (
          <DialogForm
            open={open}
            title="Редактировать бронирование"
            hasCloser
            onClose={() => handleClose('edit')}
            onOpen={() => handleOpen('edit')}
          >
            {modalAppointment?.clientLogin }
            {modalAppointment && (
              <AppointmentEdit
                handleClose={() => handleClose('edit')}
                appointment={modalAppointment}
              />
            )}
          </DialogForm>
        )}
    </Box>
  );
}
