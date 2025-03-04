import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ventana-login',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ventana-login.component.html',
  styleUrl: './ventana-login.component.css',
})
export class VentanaLoginComponent {
  /* constructor(
      private apiService: ApiService
    ) {}
    ngOnInit(): void {
      const reservaId = this.apiService.getCurrentReservaId();
      console.log('ID de la reserva obtenida:', reservaId);
    } */
}
