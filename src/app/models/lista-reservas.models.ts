export interface Reserva {
  id?: number; // opcional porque lo genera el backend
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  totalReserva: number;
  mail_cliente: string;
  idCancha: number;
  idEmpleado?: number; // opcional porque se debe asignar sin que el cliente lo sepa
}
