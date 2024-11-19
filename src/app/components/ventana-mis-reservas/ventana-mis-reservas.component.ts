import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Reserva } from '../../models/lista-reservas.models';

@Component({
  selector: 'app-ventana-mis-reservas',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService],
  templateUrl: './ventana-mis-reservas.component.html',
  styleUrls: ['./ventana-mis-reservas.component.css'],
})
export class VentanaMisReservasComponent {
  @Input() resrevaData!: Reserva;
  //@Output() onClickIcon = new EventEmitter<NCancha.CanchaData>();
  reservas: Reserva[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.mostrarReservas();
  }

  mostrarReservas(): void {
    this.apiService.getReservas().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: (error) => {
        console.error('Error al obtener las reservas', error);
      },
    });
  }
}

/*
export class VentanaMisReservasComponent implements OnInit {
  reservas: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.mostrarReservas();
  }

  mostrarReservas(): void {
    this.apiService.getReservas().subscribe({
      next: (data) => {
        this.reservas = data;
      },
      error: (error) => {
        console.error('Error al obtener las reservas', error);
      },
    });
  }
}
*/
