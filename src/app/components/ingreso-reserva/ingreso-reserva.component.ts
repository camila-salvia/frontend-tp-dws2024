import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../../models/lista-reservas.models.js';

@Component({
  selector: 'app-ingreso-reserva',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ingreso-reserva.component.html',
  styleUrl: './ingreso-reserva.component.css',
})
export class IngresoReservaComponent {
  reserva: Reserva = {
    id: 0,
    fechaReserva: '',
    horaInicio: '',
    horaFin: '',
    totalReserva: 0,
    idCliente: 0,
    idCancha: 0,
  };
  reservaConfirmada: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}

  confirmarReserva(): void {
    this.reservaConfirmada = true;
    console.log('Reserva confirmada', this.reserva);
  }

  ngOnInit(): void {
    this.reservaService.reservas$.subscribe((reserva) => {
      this.reserva = reserva[0];
    });
  }

saveReserva() {
    this.apiService.saveReserva(this.reserva).subscribe({
      next: (response: Reserva) => {
        console.log('Reserva guardada:', response);
        this.reservaService.saveReserva(response);
        this.reservaConfirmada = true;
      },
      error: (err) => {
        console.error('Error al guardar la reserva:', err);
      },
    });
  }
}
