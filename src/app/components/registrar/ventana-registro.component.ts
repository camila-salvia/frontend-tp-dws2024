import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ventana-registro',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ventana-registro.component.html',
  styleUrl: './ventana-registro.component.css',
})
export class VentanaRegistroComponent {
  /* constructor(
      private apiService: ApiService
    ) {}
    ngOnInit(): void {
      const reservaId = this.apiService.getCurrentReservaId();
      console.log('ID de la reserva obtenida:', reservaId);
    } */
}
