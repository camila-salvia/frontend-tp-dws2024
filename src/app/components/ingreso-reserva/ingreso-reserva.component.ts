import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Reserva } from '../../models/lista-reservas.models';
import { ApiService } from '../../services/api.service';
import { Cancha } from '../../models/lista-canchas.models'; // Asegurate de importar

@Component({
  selector: 'app-ingreso-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ingreso-reserva.component.html',
  styleUrls: ['./ingreso-reserva.component.css'],
})
export class IngresoReservaComponent implements OnInit {
  reserva: Reserva = {
    id: 0,
    fechaReserva: '',
    horaInicio: '',
    horaFin: '',
    totalReserva: 0, // ✅ Ahora lo dejamos en 0 y lo setea dinámico
    mail_cliente: '',
    idCancha: 0,
    idEmpleado: 0,
  };

  reservaConfirmada: boolean = false;
  emailRegistrado: boolean = true;
  usuarioConectado: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const personaGuardada = localStorage.getItem('usuarioLogueado');
    if (personaGuardada) {
      const usuario = JSON.parse(personaGuardada);
      this.reserva.mail_cliente = usuario.email;
      this.usuarioConectado = true;
    } else {
      this.usuarioConectado = false;
    }

    const idCanchaSeleccionada = localStorage.getItem('idCanchaSeleccionada');
    if (idCanchaSeleccionada) {
      this.reserva.idCancha = Number(idCanchaSeleccionada);
    }
  }

  actualizarHoraFin(): void {
    if (this.reserva.horaInicio) {
      const [hora, minutos] = this.reserva.horaInicio.split(':').map(Number);
      let nuevaHora = hora + 1;
      if (nuevaHora >= 24) nuevaHora -= 24;

      const horaFormateada = nuevaHora.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0');
      this.reserva.horaFin = horaFormateada;
    }
  }

  saveReserva(): void {
    console.log('Iniciando guardado de reserva con datos:', this.reserva);

    this.apiService.getCanchaById(this.reserva.idCancha).subscribe({
      next: (response) => {
        console.log('Datos cancha recibidos:', response);
        console.log('Cancha recibida desde backend:', response);
        const canchaData = response.data;
        if (canchaData && canchaData.precioHora) {
          // ✅ Asignar precioHora como totalReserva
          this.reserva.totalReserva = canchaData.precioHora;
          console.log('TotalReserva actualizado desde precioHora:', this.reserva.totalReserva);

          // Verificar persona
          this.apiService.getPersona(this.reserva.mail_cliente).subscribe({
            next: (persona) => {
              if (persona) {
                this.apiService.saveReserva(this.reserva).subscribe({
                  next: (response) => {
                    this.reservaConfirmada = true;
                    console.log('Reserva confirmada:', response);

                    this.apiService.updateCanchaStatus(this.reserva.idCancha, 'ocupada').subscribe({
                      next: () => {
                        console.log('Estado de cancha actualizado a ocupada');
                      },
                      error: (err) => {
                        console.error('Error al actualizar estado de cancha:', err);
                      }
                    });

                    // Redirigir a MercadoPago
                    const linkPago = response.init_point;
                    if (linkPago) {
                      console.log('Redirigiendo a MercadoPago:', linkPago);
                      window.location.href = linkPago;
                    } else {
                      console.warn('No se recibió link de pago, redirigiendo al home.');
                      setTimeout(() => {
                        window.location.href = '/';
                      }, 3000);
                    }
                  },
                  error: (err) => {
                    console.error('Error al guardar reserva:', err);
                  }
                });
              } else {
                this.emailRegistrado = false;
                this.reservaConfirmada = false;
                console.warn('Email no registrado');
              }
            },
            error: (err) => {
              this.emailRegistrado = false;
              this.reservaConfirmada = false;
              console.error('Error al verificar persona:', err);
            }
          });

        } else {
          console.error('No se encontró canchaClass o precioHora');
        }
      },
      error: (err) => {
        console.error('Error al obtener la cancha:', err);
      }
    });
  }
}
