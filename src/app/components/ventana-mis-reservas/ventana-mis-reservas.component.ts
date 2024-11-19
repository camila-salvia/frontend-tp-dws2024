import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Reserva } from '../../models/lista-reservas.models';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Agregar FormsModule

@Component({
  selector: 'app-ventana-mis-reservas',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule, // Importar FormsModule aquí
  ],
  //providers: [ApiService],
  templateUrl: './ventana-mis-reservas.component.html',
  styleUrls: ['./ventana-mis-reservas.component.css'],
})
export class VentanaMisReservasComponent {
  //@Input() resrevaData!: Reserva;
  //@Output() onClickIcon = new EventEmitter<NCancha.CanchaData>();
  reservas: Reserva[] = [];

  constructor(/*private apiService: ApiService*/) {}

  ngOnInit(): void {
    this.mostrarReservas();
  }

  mostrarReservas(): void {
    this.reservas = [
      {
        id: 1,
        fechaReserva: '2024-11-20',
        horaInicio: '10:00',
        horaFin: '11:00',
        totalReserva: 35000,
      },
      {
        id: 2,
        fechaReserva: '2024-11-20',
        horaInicio: '17:00',
        horaFin: '18:00',
        totalReserva: 45000,
      },
    ];
  }
}

/*mostrarReservas(): void {
    this.apiService.getReservas().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: (error) => {
        console.error('Error al obtener las reservas', error);
      },
    });
  }
} */
