import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Persona } from '../../models/lista-personas.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css'],
})
export class VentanaMiCuentaComponent {
  emailInput: string = '';
  persona: Persona = {
    id: 0,
    name: '',
    lastname: '',
    dni: 0,
    email: '',
    phone: 0,
    password: '',
  };

  emailValidado = false;
  emailInvalido = false;
  mostrarFormularioEdicion = false;
  actualizacionExitosa = false;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
  const personaGuardada = localStorage.getItem('usuarioLogueado');
  if (personaGuardada) {
    this.persona = JSON.parse(personaGuardada);
    this.emailValidado = true;
    this.mostrarFormularioEdicion = false;
  }
}



  verificarEmail(): void {
    this.apiService.getPersona(this.emailInput).subscribe(
      (data) => {
        console.log('Persona encontrada:', data);
        this.persona = data;
        this.cdr.detectChanges(); // Aseguramos que los cambios se reflejen en el HTML
        this.emailValidado = true;
        this.emailInvalido = false;
        this.mostrarFormularioEdicion = false;
      },
      (error) => {
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
  this.apiService.updatePersonaByEmail(this.persona.email, this.persona).subscribe(
    (response) => {
      console.log('Datos actualizados correctamente');
      this.mostrarFormularioEdicion = false;
      this.actualizacionExitosa = true;
      localStorage.setItem('usuarioLogueado', JSON.stringify(response));
    },
    (error) => {
      console.error('Error al actualizar persona:', error);
      alert('Ocurrió un error al intentar actualizar tus datos.');
    }
  );
}


  cancelar(): void {
    this.emailInput = '';
    this.emailValidado = false;
    this.emailInvalido = false;
    this.mostrarFormularioEdicion = false;
  }
}
