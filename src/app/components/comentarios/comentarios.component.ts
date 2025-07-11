import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { Cancha } from '../../models/lista-canchas.models.js';
import { CanchaService } from '../../services/cancha.service.js';

@Component({
  selector: 'app-comentarios',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css',
})
export class ComentariosComponent implements OnInit {

  nuevoComentario = {
    nombre: '',
    mensaje: '',
    calificacion: ''
  };

  listaComentarios: any[] = [];
  usuarioConectado: boolean = false;
  mostrarMensajeExito: boolean = false;

  ngOnInit() {
     const personaGuardada = localStorage.getItem('usuarioLogueado');
    if (personaGuardada) {
      const usuario = JSON.parse(personaGuardada);
      this.usuarioConectado = true;
    } else {
      this.usuarioConectado = false;
    }

    // Cargar comentarios guardados en localStorage al iniciar
    const guardados = localStorage.getItem('comentarios');
    if (guardados) {
      this.listaComentarios = JSON.parse(guardados);
    }
  }

  enviarComentario() {
    // Agregar comentario a la lista
    this.listaComentarios.push({ ...this.nuevoComentario });

    // Guardar en localStorage
    localStorage.setItem('comentarios', JSON.stringify(this.listaComentarios));

    // Mostrar mensaje de éxito
  this.mostrarMensajeExito = true;

  setTimeout(() => {
    this.mostrarMensajeExito = false;
  }, 3000);

    // Resetear campos
    this.nuevoComentario = {
      nombre: '',
      mensaje: '',
      calificacion: ''
    };
  }
}

