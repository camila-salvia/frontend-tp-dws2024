import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/lista-reservas.models';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { ReservaArticulo } from '../../models/reserva-articulo.models.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventana-mis-reservas',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './ventana-mis-reservas.component.html',
  styleUrl: './ventana-mis-reservas.component.css',
})
export class VentanaMisReservasComponent implements OnInit {
  lista_reservas: Reserva[] = [];
  email: string = '';
  emailEncontrado: boolean = true;
  mostrarMensajeExito: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const personaGuardada = localStorage.getItem('usuarioLogueado');
    if (personaGuardada) {
      const usuario = JSON.parse(personaGuardada);
      this.email = usuario.email;
      this.buscarReservas();
    }

    this.reservaService.reservas$.subscribe((reservas) => {
      this.lista_reservas = reservas;
    });

    const reservaId = this.apiService.getCurrentReservaId();
    console.log('ID de la reserva obtenida:', reservaId);
  }

  seleccionarReserva(reserva: Reserva): void {
  console.log('Reserva seleccionada:', reserva);
  if (reserva.id !== undefined && reserva.id !== null) {
    localStorage.setItem('reservaId', reserva.id.toString());
    // Redirigir a la vista de artículos
    window.location.href = '/articulos'; // O usa router.navigate si estás usando rutas Angular
  } else {
    console.error('El id de la reserva es undefined o null');
  }
}


  buscarReservas(): void {
    if (this.email) {
      this.apiService.getReserva(this.email).subscribe({
        next: (response: any) => {
          console.log('Respuesta de la API:', response);
          this.lista_reservas = Array.isArray(response.data)
            ? response.data
            : [response.data];

          this.emailEncontrado = this.lista_reservas.length > 0;
        },
        error: () => {
          this.emailEncontrado = false;
          this.lista_reservas = [];
        },
      });
    }
  }

  deleteReserva(id: number): void {
    const reserva = this.lista_reservas.find((r) => r.id === id);
    if (reserva) {
      //if (confirm('¿Estás seguro que querés cancelar la reserva?')) {
        this.apiService.updateCanchaStatus(reserva.idCancha, 'disponible').subscribe({
          next: () => {
            this.apiService.deleteReserva(id).subscribe({
              next: () => {
                this.mostrarMensajeExito = true;

                // Actualizar la lista después de eliminar
                this.buscarReservas();

                // Ocultar mensaje luego de 3 segundos
                setTimeout(() => {
                  this.mostrarMensajeExito = false;
                }, 3000);
              },
              error: (error) => {
                console.error('Error al eliminar la reserva:', error);
              },
            });
          },
          error: (error) => {
            console.error('Error al actualizar la cancha:', error);
          },
        });
      }
    }
  }
