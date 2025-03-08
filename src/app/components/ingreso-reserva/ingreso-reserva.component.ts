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
    mail_cliente: '',
    idCancha: 0,
    idEmpleado: 0,
  };
  reservaConfirmada: boolean = false;
  canchaNoExiste: boolean = false;
  selectedCanchaId: number = 0; // Add this line

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Inicializa la reserva con valores por defecto para una nueva reserva.
    this.reserva = {
      id: 0, // o genera un ID temporal único si es necesario
      fechaReserva: '',
      horaInicio: '',
      horaFin: '',
      totalReserva: 40000,
      mail_cliente: '',
      idCancha: 0,
      idEmpleado: 0,
    };

    const idCanchaSeleccionada = localStorage.getItem('idCanchaSeleccionada');
    if (idCanchaSeleccionada) {
      this.reserva.idCancha = Number(idCanchaSeleccionada);
      console.log(`idCancha de la reserva: ${this.reserva.idCancha}`);
      this.verificarCancha(this.reserva.idCancha);
    }
  }

  verificarCancha(idCancha: number): void {
    this.apiService.verificarCancha(idCancha).subscribe({
      next: (cancha) => {
        if (cancha) {
          console.log('Cancha verificada:', cancha);
          this.canchaNoExiste = false;
        } else {
          this.canchaNoExiste = true;
          console.error('Cancha no encontrada');
        }
      },
      error: (err) => {
        this.canchaNoExiste = true;
        console.error('Error al verificar la cancha:', err);
      },
    });
  }

  confirmarReserva(): void {
    this.reservaConfirmada = true;
    console.log('Reserva confirmada', this.reserva);
  }

  saveReserva() {
    // Asignar la cancha seleccionada a la reserva
    // this.reserva.idCancha = this.selectedCanchaId;

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
                    // Guardar el ID de la reserva en localStorage ??
                    // localStorage.setItem('reservaId', String(reserva.id)); // Asegurar que es un número en String
                    //localStorage.setItem('reservaId', response.id);
                    const reservaId = this.apiService.getCurrentReservaId();
                    console.log('ID de la reserva obtenida:', reservaId);
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
