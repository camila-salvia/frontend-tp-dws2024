import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancha } from '../models/lista-canchas.models.js';
import { Reserva } from '../models/lista-reservas.models.js';
import { ReservaArticulo } from '../models/reserva-articulo.models.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Método para obtener canchas
  getCanchas(): Observable<any> {
    return this.http.get<Cancha[]>('http://localhost:3000/api/cancha');
  }

  getCanchaById(id: number): Observable<Cancha> {
    return this.http.get<Cancha>(`http://localhost:3000/api/cancha/${id}`);
  }

  // Metodo para obtener reservas
  getReservas(): Observable<any> {
    return this.http.get<Reserva[]>('http://localhost:3000/api/reserva');
  }

  // Metodo para guardar reservas
  saveReserva(reserva: Reserva): Observable<any> {
    return this.http.post<Reserva>(
      'http://localhost:3000/api/reserva',
      reserva
    );
  }

  updateCanchaStatus(id: number, estado: string): Observable<any> {
    return this.http.put(`http://localhost:3000/api/cancha/${id}`, { estado });
  }

  // Metodo para cancelar reservas
  deleteReserva(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/reserva/${id}`);
  }

  // Metodo para obtener todos los articulos
  getArticulos(): Observable<any> {
    return this.http.get('http://localhost:3000/api/articulo');
  }

  getCurrentReservaId(): number | null {
    const idReserva = localStorage.getItem('reservaId'); // Recupera el valor
    console.log('Valor crudo de reservaId desde localStorage:', idReserva);
    return idReserva && !isNaN(Number(idReserva)) ? Number(idReserva) : null;
    //return idReserva ? Number(idReserva) : null; // Convierte a número solo si existe
  }

  reservarArticulo(reservaArticulo: ReservaArticulo) {
    return this.http.post(
      'http://localhost:3000/api/reserva_articulo',
      reservaArticulo
    );
  }

  updateArticuloStatus(id: number, estado: string): Observable<any> {
    return this.http.put(` http://localhost:3000/api/articulo/classes/${id}`, {
      estado,
    });
  }
}
