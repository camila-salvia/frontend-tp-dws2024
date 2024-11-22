import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/lista-reservas.models';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ingreso-reserva',
  standalone: true,
  providers: [ApiService],
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule,
  ],
  templateUrl: './ingreso-reserva.component.html',
  styleUrl: './ingreso-reserva.component.css',
})
export class IngresoReservaComponent {
  reserva: Reserva[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit(): void {}

  reservaConfirmada: boolean = false;

  confirmarReserva(): void {
    // Add your reservation confirmation logic here
    this.reservaConfirmada = true;

    /* alert('Reserva confirmada!');
    setTimeout(() => {
      location.reload();
    }, 5000); */
  }

  /* saveReserva() {
    //delete this.reserva.id;
    this.reservaService.saveReserva(this.reserva).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.error(err)
    );
  } */
}
