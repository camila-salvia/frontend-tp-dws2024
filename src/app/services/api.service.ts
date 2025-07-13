import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancha } from '../models/lista-canchas.models.js';
import { Reserva } from '../models/lista-reservas.models.js';
import { ReservaArticulo } from '../models/reserva-articulo.models.js';
import { Persona } from '../models/lista-personas.models.js';

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

  savePersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(
      'http://localhost:3000/api/persona',
      persona
    );
  }

  // ver cómo buscar persona por mail y id
  getPersona(email: string): Observable<Persona> {
    return this.http.get<Persona>(`http://localhost:3000/api/persona/${email}`);
  }

  loginPersona(email: string, password: string): Observable<Persona> {
  return this.http.post<Persona>('http://localhost:3000/api/login', {
    email,
    password,
  });
}

updatePersonaByEmail(email: string, persona: Persona): Observable<Persona> {
  const encodedEmail = encodeURIComponent(email);
  return this.http.put<Persona>(`http://localhost:3000/api/persona/${encodedEmail}`, persona);
}

verificarCancha(idCancha: number): Observable<Cancha> {
    return this.http.get<Cancha>(`${this.apiUrl}/cancha/${idCancha}`);
}

  getReserva(email: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(
      `http://localhost:3000/api/reserva/${email}`
    );
  }

  createReservaConPago(reserva: Reserva): Observable<any> {
    return this.http.post<Reserva>(
      'http://localhost:3000/api/reserva',
      reserva
    );
  }
}
