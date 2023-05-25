import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { BottomDrawer } from '~/components/bottom-drawer';
import { DialogForm } from '~/components/Dialog';
import { UserAppointments, IAppointment, AppointmentEdit } from '~/features/appointment';
import { useResponsive } from '~/hooks/useResponsive';
import { useAppSelector } from '~/store';

export function Dashboard() {
  const user = useAppSelector((state) => state.authSlice.user);

  const [openModal, setOpenModal] = useState(false);
  const [modalAppointment, setModalAppointment] = useState<IAppointment|null>(null);
  const isMobile = useResponsive('down', 'sm');
  const handleClose = () => {
    setOpenModal(false);
    setModalAppointment(null);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClick = (appointment:IAppointment) => {
    setOpenModal(true);
    setModalAppointment(appointment);
  };

  return (
    <Box>
      <Typography variant="h5">
        Пользователь:
        {user?.login}
      </Typography>
      <Typography variant="body2">
        Текущие бронирования
      </Typography>
      <UserAppointments handleClick={handleClick} />
      {isMobile
        ? (
          <BottomDrawer
            onClose={handleClose}
            onOpen={handleOpen}
            title="Редактировать бронирование"
            hasCloser
            open={openModal}
            fullHeight
          >
            {modalAppointment?.clientLogin }
            {modalAppointment && <AppointmentEdit appointment={modalAppointment} />}

          </BottomDrawer>
        ) : (
          <DialogForm
            open={openModal}
            title="Редактировать бронирование"
            hasCloser
            onClose={handleClose}
            onOpen={handleOpen}
          >
            {modalAppointment?.clientLogin }
            {modalAppointment && <AppointmentEdit appointment={modalAppointment} />}
          </DialogForm>
        )}

    </Box>
  );
}
