export interface Reserva {
  id?: number; // opcional porque lo genera el backend
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
  totalReserva: number;
  idCliente: number;
  idCancha: number;
  idEmpleado?: number; // opcional porque se asigna desde el backend ¿?
}
