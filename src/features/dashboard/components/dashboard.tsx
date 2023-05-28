import React, { useState } from 'react';

import { Box, Typography, Button } from '@mui/material';

import { UserAppointments, IAppointment } from '~/features/appointment';
import { useAppSelector } from '~/store';

import { ModalCreate } from './modal-create';
import { ModalEdit } from './modal-edit';

export function Dashboard() {
  const user = useAppSelector((state) => state.authSlice.user);

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [modalAppointment, setModalAppointment] = useState<IAppointment|null>(null);

  const handleClick = (appointment:IAppointment) => {
    setOpenEdit(true);
    setModalAppointment(appointment);
  };

  const handleClose = (type: 'edit'| 'create') => {
    if (type === 'edit') {
      setOpenEdit(false);
      setModalAppointment(null);
    } else {
      setOpenCreate(false);
    }
    setOpenEdit(false);
    setModalAppointment(null);
  };
  const handleOpen = (type: 'edit'| 'create') => {
    if (type === 'edit') {
      setOpenEdit(true);
    } else {
      setOpenCreate(true);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5">
            Пользователь:
            {user?.login}
          </Typography>
          <Typography variant="body2">
            Текущие бронирования
          </Typography>
        </Box>
        <Button onClick={() => setOpenCreate(true)}>Добавить</Button>
      </Box>

      <UserAppointments handleClick={handleClick} />
      {modalAppointment && (
      <ModalEdit
        open={openEdit}
        modalAppointment={modalAppointment}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      )}
      <ModalCreate open={openCreate} handleClose={handleClose} handleOpen={handleOpen} />

    </Box>
  );
}
