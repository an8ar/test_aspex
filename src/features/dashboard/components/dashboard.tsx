import React, { useState } from 'react';

import {
  Box, Typography, Button, CircularProgress,
} from '@mui/material';

import appointmentApi from '~/api/appointment/api';
import { UserAppointments, IAppointment } from '~/features/appointment';
import { useAppSelector } from '~/store';

import { AppointmentCreateModal } from '../../appointment/components/appointment-create-modal';
import { AppointmentEditModal } from '../../appointment/components/appointment-edit-modal';

export function Dashboard() {
  const user = useAppSelector((state) => state.authSlice.user);

  const { isLoading } = appointmentApi.endpoints.getAppointments.useQuery();

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const [modalAppointment, setModalAppointment] = useState<IAppointment|null>(null);

  const handleEditClick = (appointment:IAppointment) => {
    setOpenEdit(true);
    setModalAppointment(appointment);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setModalAppointment(null);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleOpenCreate = () => {
    setOpenCreate(true);
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
      {isLoading ? <CircularProgress />
        : <UserAppointments handleEditClick={handleEditClick} />}
      {modalAppointment && (
      <AppointmentEditModal
        open={openEdit}
        modalAppointment={modalAppointment}
        handleClose={handleCloseEdit}
        handleOpen={handleOpenEdit}
      />
      )}
      <AppointmentCreateModal
        open={openCreate}
        handleClose={handleCloseCreate}
        handleOpen={handleOpenCreate}
      />

    </Box>
  );
}
