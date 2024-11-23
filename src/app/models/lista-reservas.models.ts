export interface Reserva {
  id?: number;
  fechaReserva?: string;
  horaInicio?: string;
  horaFin?: string;
  totalReserva?: number;
  idCliente?: number;
  idCancha?: number;
}
