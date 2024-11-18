import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ventana-mis-reservas',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './ventana-mis-reservas.component.html',
  styleUrls: ['./ventana-mis-reservas.component.css'],
})
export class VentanaMisReservasComponent implements OnInit {
  reservas: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.mostrarReservas();
  }

  /* mostrarReservas(): void {
    this.apiService
      .getReservas()
      .subscribe(
        (data) => {
          this.reservas = data;
        },
        (error) => {
          console.error('Error al obtener las reservas', error);
        }
      );
  }
} */

  mostrarReservas(): void {
    this.reservas = [
      this.apiService
        .getReservas(/*'http://localhost:3000/api/reserva'*/)
        .subscribe(
          (data) => {
            this.reservas = data;
          },
          (error) => {
            console.error('Error al obtener las reservas', error);
          }
        ),
      /*
      {
        cancha: 'Cancha 1',
        fecha: '2021-10-10',
        hora: '10:00',
        duracion: '1 hora',
      },
      {
        cancha: 'Cancha 2',
        fecha: '2021-10-10',
        hora: '11:00',
        duracion: '1 hora',
      },
      {
        cancha: 'Cancha 3',
        fecha: '2021-10-10',
        hora: '12:00',
        duracion: '1 hora',
      },
      */
    ];
  }
}

/* mostrarReservas(): void {
    this.apiService.getReservas().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al obtener las reservas', error);
      }
    );
  } */
