import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancha } from '../models/lista-canchas.models.js';
import { Reserva } from '../models/lista-reservas.models.js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // supuestamente aca se ponen los metodos para acceder al back

  // Método para obtener datos
  getCanchas(): Observable<any> {
    //return this.http.get(`${this.apiUrl}/cancha`);   o httpClient???
    return this.http.get<Cancha[]>('http://localhost:3000/api/cancha');
  }

  // Metodo para obtener reservas
  getReservas(): Observable<any> {
    return this.http.get<Reserva[]>('http://localhost:3000/api/reserva'); //asi estaba antes cancha tambien
  }

  // Metodo para guardar reservas
  saveReserva(reserva: Reserva): Observable<any> {
    return this.http.post<Reserva>(
      'http://localhost:3000/api/reserva',
      reserva
    );
  }
}
