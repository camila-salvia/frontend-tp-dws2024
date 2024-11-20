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
export class VentanaMisReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {
    // Suscribirse al observable del servicio para obtener las canchas
    this.reservaService.reservas$.subscribe((data) => {
      this.reservas = data; // Recibe actualizaciones de las canchas
      console.log('Reservas en el hijo:', this.reservas);
    });
  }
}
