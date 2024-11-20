import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../models/lista-reservas.models';
import { ReservaService } from '../../services/reserva.service';
import { ApiService } from '../../services/api.service';
import { OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { VentanaMisReservasComponent } from '../ventana-mis-reservas/ventana-mis-reservas.component';

@Component({
  selector: 'app-ventana-home',
  standalone: true,
  providers: [ApiService],
  imports: [
    VentanaMisReservasComponent,
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './ventana-home.component.html',
  styleUrl: './ventana-home.component.css',
})
export class VentanaHomeComponent implements OnInit {
  lista_reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.reservaService.reservas$.subscribe((reservas) => {
      this.lista_reservas = reservas;
    });
  }

  get hasReservas(): boolean {
    return this.lista_reservas && this.lista_reservas.length > 0;
  }

  getReservas() {
    this.apiService.getReservas().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          this.reservaService.setReservas(response.data);
          console.log('Reservas guardadas en el servicio:', response.data);
        } else {
          console.error(
            'Error: no se encontraron reservas o la propiedad "data" no es un arreglo',
            response
          );
        }
      },
    });
  }

  trackByFn(_index: number, item: Reserva) {
    //solo se renderiza el elemento modificado
    return item.id;
  }
}
