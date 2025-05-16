import { Injectable } from '@angular/core';
import { Persona } from '../models/lista-personas.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private personaSubject = new BehaviorSubject<Persona | null>(null);
  persona$ = this.personaSubject.asObservable();

  constructor() {
    const personaStorage = localStorage.getItem('usuarioLogueado');
    if (personaStorage) {
      this.personaSubject.next(JSON.parse(personaStorage));
    }
  }

  savePersona(persona: Persona | null): void {
    this.personaSubject.next(persona);
    if (persona) {
      localStorage.setItem('usuarioLogueado', JSON.stringify(persona));
    } else {
      localStorage.removeItem('usuarioLogueado');
    }
  }

  getPersona(): Persona | null {
    return this.personaSubject.getValue();
  }

  clearPersona(): void {
    this.savePersona(null);
  }

  isLoggedIn(): boolean {
    return this.getPersona() !== null;
  }
}
