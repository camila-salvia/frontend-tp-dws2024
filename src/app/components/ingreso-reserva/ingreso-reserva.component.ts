import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../../models/lista-reservas.models.js';
import { CanchaService } from '../../services/cancha.service';

@Component({
  selector: 'app-ingreso-reserva',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
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
    totalReserva: 36000,
    idCliente: 0,
    idCancha: 0,
    idEmpleado: 0,
  };
  reservaConfirmada: boolean = false;
  canchaNoExiste: boolean = false;

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}

  confirmarReserva(): void {
    this.reservaConfirmada = true;
    console.log('Reserva confirmada', this.reserva);
  }

  ngOnInit(): void {
    // Inicializa la reserva con valores por defecto para una nueva reserva.
    this.reserva = {
      id: 0, // o genera un ID temporal único si es necesario
      fechaReserva: '',
      horaInicio: '',
      horaFin: '',
      totalReserva: 40000,
      idCliente: 0,
      idCancha: 0,
      idEmpleado: 0,
    };
  }

  saveReserva() {
    // Vemos que `this.reserva` tenga los valores requeridos.
    // verificar que exista el id cancha ingresado
    this.apiService.getCanchaById(this.reserva.idCancha).subscribe({
      next: (cancha) => {
        if (cancha) {
          // Cancha exists, proceed to save the reservation
          this.apiService.saveReserva(this.reserva).subscribe({
            next: (response) => {
              console.log('Reserva guardada:', response);
              this.reservaService.saveReserva(response);
              this.reservaConfirmada = true;
              this.apiService
                .updateCanchaStatus(this.reserva.idCancha, 'ocupada')
                .subscribe({
                  next: (updateResponse) => {
                    console.log(
                      'Estado de la cancha actualizado:',
                      updateResponse
                    );
                  },
                  error: (updateError) => {
                    console.error(
                      'Error al actualizar el estado de la cancha:',
                      updateError
                    );
                  },
                });
            },
            error: (err) => {
              console.error('Error al guardar la reserva:', err);
            },
          });
        }
      },
      error: (err) => {
        this.canchaNoExiste = true;
        console.error('Error al verificar la cancha:', err);
      },
    });
  }
}
