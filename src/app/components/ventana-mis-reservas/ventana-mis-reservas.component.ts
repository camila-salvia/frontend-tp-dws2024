import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/lista-reservas.models';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ventana-mis-reservas',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ventana-mis-reservas.component.html',
  styleUrl: './ventana-mis-reservas.component.css',
})
export class VentanaMisReservasComponent {
  lista_reservas: Reserva[] = []; // arreglo de reservas

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.apiService.getReservas().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          // Verificar que la respuesta contiene la propiedad 'data' que es un arreglo
          this.reservaService.setReservas(response.data); // Pasar el arreglo de reservas al servicio
          console.log('Reservas guardadas en el servicio:', response.data);
        } else {
          console.error(
            'Error: no se encontraron reservas o la propiedad "data" no es un arreglo',
            response
          );
        }
      },
      error: (error) => {
        console.error('Error al obtener las reservas:', error);
      },
    });
    // Obtener canchas desde el servicio
    this.reservaService.reservas$.subscribe((reservas) => {
      this.lista_reservas = reservas; // Actualiza lista_reservas con los datos del servicio
      console.log('reservas oninit');
    });
  }

  deleteReserva(id: number): void {
    const reserva = this.lista_reservas.find((reserva) => reserva.id === id);
    if (reserva) {
      this.apiService
        .updateCanchaStatus(reserva.idCancha, 'disponible')
        .subscribe({
          next: () => {
            console.log(`Estado de la cancha actualizado a disponible`);
            this.apiService.deleteReserva(id).subscribe({
              next: () => {
                this.lista_reservas = this.lista_reservas.filter(
                  (reserva) => reserva.id !== id
                );
                console.log(`Reserva con id ${id} eliminada`);
              },
              error: (error) => {
                console.error('Error al eliminar la reserva:', error);
              },
            });
          },
          error: (error) => {
            console.error('Error al actualizar el estado de la cancha:', error);
          },
        });
    } else {
      console.error('Reserva no encontrada');
    }
  }
}
