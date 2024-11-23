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
export class VentanaMisReservasComponent /*implements OnInit*/ {
  /*reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio para obtener las canchas
    this.reservaService.reservas$.subscribe((data) => {
      this.reservas = data; // Recibe actualizaciones de las canchas
      console.log('Reservas en el hijo:', this.reservas);
    });
  } */

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
}
