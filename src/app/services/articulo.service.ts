import { Injectable } from '@angular/core';
import { Articulo } from '../models/lista-articulos.models.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  private articulosSource = new BehaviorSubject<Articulo[]>([]); // Manejo reactivo de datos (datos iniciales)
  articulos$ = this.articulosSource.asObservable(); // Observable al que los componentes pueden suscribirse

  constructor() {}

  setArticulos(articulos: Articulo[]): void {
    if (Array.isArray(articulos)) {
      // Verifica si la variable 'canchas' es un arreglo antes de emitir el cambio
      this.articulosSource.next(articulos); // Actualiza el estado de las canchas
    } else {
      console.error(
        'Error: se necesita un arreglo de articulos pero se recibio',
        articulos
      ); // Para pruebas
    }
  }

  getArticulos(): Articulo[] {
    const articulos = this.articulosSource.getValue(); // Obtiene todas las canchas actuales
    return articulos;
  }
}
