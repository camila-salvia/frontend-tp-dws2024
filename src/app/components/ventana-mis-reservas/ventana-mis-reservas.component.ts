import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/lista-reservas.models';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { ReservaArticulo } from '../../models/reserva-articulo.models.js';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-ventana-mis-reservas',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './ventana-mis-reservas.component.html',
  styleUrl: './ventana-mis-reservas.component.css',
})
export class VentanaMisReservasComponent {
  lista_reservas: Reserva[] = []; // arreglo de reservas
  email: string = '';
  reserva_articulo: ReservaArticulo = {
    idReserva: 0,
    idArticulo: 0,
  };
  emailEncontrado: boolean = true;

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    /* this.apiService.getReservas().subscribe({
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
    }); */
    // Obtener canchas desde el servicio
    this.reservaService.reservas$.subscribe((reservas) => {
      this.lista_reservas = reservas; // Actualiza lista_reservas con los datos del servicio
      console.log('reservas oninit');
    });

    const reservaId = this.apiService.getCurrentReservaId();
    console.log('ID de la reserva obtenida:', reservaId);
  }

  buscarReservas(): void {
    if (this.email) {
      this.apiService.getReserva(this.email).subscribe({
        next: (response: any) => {
          // Aseguramos que response tiene la estructura esperada
          console.log('Respuesta de la API:', response);

          if (response && response.data) {
            // Si response.data es un array, lo usamos directamente
            // Si es un objeto, lo convertimos en un array
            this.lista_reservas = Array.isArray(response.data)
              ? response.data
              : [response.data];
          } else {
            this.lista_reservas = []; // Si no hay datos, evitamos errores
          }

          this.emailEncontrado = this.lista_reservas.length > 0;
          console.log('Reservas encontradas:', this.lista_reservas);
        },
        error: (error) => {
          console.error('Error al obtener las reservas:', error);
          this.emailEncontrado = false;
        },
      });
    }
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
