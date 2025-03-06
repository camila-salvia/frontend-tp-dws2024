import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Persona } from '../../models/lista-personas.models';
import { PersonaService } from '../../services/persona.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventana-registro',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ventana-registro.component.html',
  styleUrl: './ventana-registro.component.css',
})
export class VentanaRegistroComponent {
  persona: Persona = {
    id: 0,
    name: '',
    lastname: '',
    dni: 0,
    email: '',
    phone: 0,
  };
  registroConfirmado: boolean = false;

  constructor(
    private personaService: PersonaService,
    private apiService: ApiService
  ) {}

  registrarse(): void {
    this.registroConfirmado = true;
    console.log('Registro confirmado', this.persona);
  }

  ngOnInit(): void {
    // Inicializa la persona con valores por defecto para una nueva persona.
    this.persona = {
      id: 0, // o genera un ID temporal único si es necesario
      name: '',
      lastname: '',
      dni: 0,
      email: '',
      phone: 0,
    };
  }

  savePersona() {
    this.apiService.savePersona(this.persona).subscribe(
      (response) => {
        console.log('Persona guardada exitosamente', response);
        this.personaService.savePersona(this.persona);
        this.registroConfirmado = true;
      },
      (error) => {
        console.error('Error al guardar persona', error);
      }
    );
  }
}
