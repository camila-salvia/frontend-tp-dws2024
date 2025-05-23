import { Injectable } from '@angular/core';
import { Reserva } from '../models/lista-reservas.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private reservasSource = new BehaviorSubject<Reserva[]>([]); // Manejo reactivo de datos
  reservas$ = this.reservasSource.asObservable(); // Observable al que los componentes pueden suscribirse

  constructor() {}

  setReservas(reservas: Reserva[]): void {
    // Verifica si la variable 'reservas' es un arreglo antes de emitir el cambio
    if (Array.isArray(reservas)) {
      this.reservasSource.next(reservas); // Actualiza el estado de las reservas
    } else {
      console.error(
        'Error: se necesita un arreglo de reservas pero se recibio',
        reservas
      );
    }
  }

  getReservas(): Reserva[] {
    return this.reservasSource.value; // Devuelve las reservas actuales
  }

  //El método saveReserva debería agregar una nueva reserva al arreglo gestionado por el servicio
  saveReserva(reserva: Reserva): void {
    const reservas = this.getReservas(); // Obtiene las reservas actuales
    reservas.push(reserva); // Agrega la nueva reserva
    this.setReservas(reservas); // Actualiza el estado de las reservas
  }

  //El método removeReserva debería eliminar una reserva del arreglo gestionado por el servicio
  deleteRerserva(id?: number): void {
    const reservas = this.getReservas(); // Obtiene las reservas actuales
    const index = reservas.findIndex((reserva) => reserva.id === id); // Busca la reserva por ID
    if (index >= 0) {
      reservas.splice(index, 1); // Elimina la reserva del arreglo
      this.setReservas(reservas); // Actualiza el estado de las reservas
    } else {
      console.error('Error: no se encontró la reserva con ID', id);
    }
  }
}
