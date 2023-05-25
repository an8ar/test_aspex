export interface IAppointment {
    date: string;
    tableId: number;
    appointmentId: number;
    clientLogin: string;
    duration: number;
    capacity: number;
}

export interface Table {
    tableId: number;
    capacity: number;
  }
