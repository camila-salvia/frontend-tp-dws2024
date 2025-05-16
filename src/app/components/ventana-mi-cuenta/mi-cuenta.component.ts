import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Persona } from '../../models/lista-personas.models';
import { ApiService } from '../../services/api.service';
import { PersonaService } from '../../services/persona.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css'],
})
export class VentanaMiCuentaComponent implements OnInit {
  persona: Persona = {
    id: 0,
    name: '',
    lastname: '',
    dni: 0,
    email: '',
    phone: 0,
    password: '',
  };

  emailInput: string = '';
  emailValidado = false;
  emailInvalido = false;
  mostrarFormularioEdicion = false;
  actualizacionExitosa = false;

  constructor(
    private apiService: ApiService,
    private personaService: PersonaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.personaService.persona$.subscribe((persona) => {
      if (persona) {
        this.persona = persona;
        this.emailValidado = true;
        this.cdr.detectChanges(); // si usás ChangeDetectorRef
      } else {
        this.emailValidado = false;
      }
    });
  }

  verificarEmail(): void {
    this.apiService.getPersona(this.emailInput).subscribe(
      (data) => {
        this.persona = data;
        this.emailValidado = true;
        this.emailInvalido = false;
        this.mostrarFormularioEdicion = false;
      },
      () => {
        this.emailValidado = false;
        this.emailInvalido = true;
        this.mostrarFormularioEdicion = false;
      }
    );
  }

  irAModificar(): void {
    this.mostrarFormularioEdicion = true;
  }

  guardarCambios(): void {
    const emailOriginal = this.persona.email;

    this.apiService.updatePersonaByEmail(emailOriginal, this.persona).subscribe(
      (response: any) => {
        // si usás tipos, pon 'any' o define la interfaz correcta
        console.log('✅ Persona actualizada:', response);

        this.persona = response.data;
        this.personaService.savePersona(response.data);

        this.mostrarFormularioEdicion = false;
        this.actualizacionExitosa = true;

        setTimeout(() => {
          this.actualizacionExitosa = false;
        }, 3000);
      },
      (error) => {
        console.error('❌ Error al actualizar:', error);
        alert('Ocurrió un error al intentar actualizar tus datos.');
      }
    );
  }
}
