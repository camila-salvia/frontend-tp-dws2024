import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../models/lista-reservas.models';
import { ReservaService } from '../../services/reserva.service';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  providers: [ApiService],
  imports: [
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css',
})
export class VentanaUbicacionComponent {

}
