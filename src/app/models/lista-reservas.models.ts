export interface Reserva {
  id?: number; // opcional porque lo genera el backend
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  totalReserva: number;
  idCliente: number;
  idCancha: number;
  idEmpleado?: number; // opcional porque se debe asignar sin que el cliente lo sepa
}
