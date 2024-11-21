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
    if (Array.isArray(canchas)) { // Verifica si la variable 'canchas' es un arreglo antes de emitir el cambio
      this.canchasSource.next(canchas); // Actualiza el estado de las canchas
    } else {
      console.error('Error: se necesita un arreglo de canchas pero se recibio',canchas); // Para pruebas
    }
  }

  getCanchas(tipo?: string): Cancha[] {
    const canchas = this.canchasSource.getValue(); // Obtiene todas las canchas actuales
    if (tipo) {
      return canchas.filter((cancha) => cancha.canchaClass.tipoCancha === "futbol 7"); // Filtrar
    }
    return canchas;
  }
  }
