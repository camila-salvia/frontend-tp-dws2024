import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Persona } from '../../models/lista-personas.models';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventana-login',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ventana-login.component.html',
  styleUrl: './ventana-login.component.css',
})
export class VentanaLoginComponent {
  persona: Persona = {
    id: 0,
    name: '',
    lastname: '',
    dni: 0,
    email: '',
    phone: 0,
    password: '',
  };
  loginConfirmado: boolean = false;
  submitted: boolean = false;

  constructor(
    private apiService: ApiService,
    private personaService: PersonaService,
    private router: Router // <-- Agregá el router aquí
  ) {}

  loguearse(): void {
    this.loginConfirmado = true;
    console.log('Login confirmado', this.persona);
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
      password: '',
    };
  }

  login(): void {
  this.apiService.loginPersona(this.persona.email, this.persona.password).subscribe(
    (persona) => {
      console.log('Login exitoso', persona);
      localStorage.setItem('usuarioLogueado', JSON.stringify(persona)); // <- Acá guardás sesión
      this.personaService.savePersona(persona);
      this.loginConfirmado = true;
      this.submitted = true;
    },
    (error) => {
      console.error('Error en login', error);
      this.loginConfirmado = false;
      this.submitted = true;
    }
  );
}


  redirectToHome(): boolean {
    // Redirige a la página principal si el login fue confirmado
    if (this.loginConfirmado) {
      setTimeout(() => {
        window.location.href = '';
      }, 3000);
    }
    return true;
  }
}
