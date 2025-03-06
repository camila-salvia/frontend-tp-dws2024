import { Injectable } from '@angular/core';
import { Persona } from '../models/lista-personas.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personasSource = new BehaviorSubject<Persona[]>([]); // Manejo reactivo de datos
  personas$ = this.personasSource.asObservable(); // Observable al que los componentes pueden suscribirse

  constructor() {}

  setPersonas(personas: Persona[]): void {
    if (Array.isArray(personas)) {
      this.personasSource.next(personas);
    } else {
      console.error(
        'Error: se necesita un arreglo de personas pero no se recibio',
        personas
      );
    }
  }

  getPersonas(): Persona[] {
    return this.personasSource.value;
  }

  savePersona(persona: Persona): void {
    const personas = this.getPersonas();
    personas.push(persona);
    this.setPersonas(personas);
  }

  getPersona(email: string): Persona | undefined {
    return this.getPersonas().find((persona) => persona.email === email);
  }

  // Hay que hacer una baja de usuario ?????
  /* deleteRerserva(id?: number): void {
    const reservas = this.getReservas(); 
    const index = reservas.findIndex((reserva) => reserva.id === id); 
    if (index >= 0) {
      reservas.splice(index, 1); 
      this.setReservas(reservas);
    } else {
      console.error('Error: no se encontró la reserva con ID', id);
    }
  } */
}
