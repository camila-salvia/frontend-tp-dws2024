import { Injectable } from '@angular/core';
import { Cancha } from '../models/lista-canchas.models.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private canchasSource = new BehaviorSubject<Cancha[]>([]); // Manejo reactivo de datos
  canchas$ = this.canchasSource.asObservable(); // Observable al que los componentes pueden suscribirse

  constructor() { }

//  setCanchas(canchas: Cancha[]): void {
//    this.canchasSource.next(canchas); // Actualiza el estado de las canchas
//  }
setCanchas(canchas: Cancha[]): void {
    // Verifica si la variable 'canchas' es un arreglo antes de emitir el cambio
    if (Array.isArray(canchas)) {
      this.canchasSource.next(canchas); // Actualiza el estado de las canchas
    } else {
      console.error('Error: se necesita un arreglo de canchas pero se recibio',canchas);
    }
  }

  getCanchas(): Cancha[] {
    return this.canchasSource.value; // Devuelve las canchas actuales
  }
}
