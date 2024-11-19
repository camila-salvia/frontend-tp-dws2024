import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancha } from '../models/lista-canchas.models.js';
import { Reserva } from '../models/lista-reservas.models.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Método para obtener datos de canchas
  getCanchas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/cancha`);
  }

  // Método para obtener reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva`);
  }
}
