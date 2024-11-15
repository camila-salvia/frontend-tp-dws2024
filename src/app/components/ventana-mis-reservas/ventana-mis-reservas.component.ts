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

  mostrarReservas(): void {
    this.apiService.getReservas().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al obtener las reservas', error);
      }
    );
  }
}
