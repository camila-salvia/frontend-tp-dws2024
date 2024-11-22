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

  //  setCanchas(canchas: Cancha[]): void {
  //    this.canchasSource.next(canchas); // Actualiza el estado de las canchas
  //  }
  setReservas(reservas: Reserva[]): void {
    // Verifica si la variable 'canchas' es un arreglo antes de emitir el cambio
    if (Array.isArray(reservas)) {
      this.reservasSource.next(reservas); // Actualiza el estado de las canchas
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

  saveReserva(reserva: Reserva): void {
    const reservas = this.getReservas(); // Obtiene las reservas actuales
    reservas.push(reserva); // Agrega la nueva reserva
    this.setReservas(reservas); // Actualiza el estado de las reservas
  }
}
