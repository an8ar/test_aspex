export interface IAppointment {
    date: string;
    startTime: string;
    tableId: number;
    appointmentId: number;
    clientLogin: string;
    capacity: number;
  }

export interface Table {
    tableId: number;
    capacity: number;
  }
