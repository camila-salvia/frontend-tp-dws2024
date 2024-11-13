import { Component, OnInit } from '@angular/core';
import { CANCHA_DATA } from '../../../assets/canchas.js';
import { NCancha } from '../../models/cancha.models.js';
import { CanchasComponent } from '../canchas/canchas.component.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ventana-reservas',
  standalone: true,
  imports: [
    CanchasComponent,
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './ventana-reservas.component.html',
  styleUrl: './ventana-reservas.component.css',
})
export class VentanaReservasComponent implements OnInit {
  // VARIABLES
  datosCancha: NCancha.CanchaData[] = CANCHA_DATA; // Todas las canchas
  canchasFiltradas: NCancha.CanchaData[] = []; // Lista de canchas filtradas
  filtroTipo: string = ''; // Variable para el tipo de cancha a filtrar

  constructor(
    private httpClient: HttpClient /*, private service: ApiService*/
  ) {}

  ngOnInit(): void {
    // para despues
    // Inicialmente, muestra solo las canchas en estado "disponible"
    //this.canchasFiltradas = this.datosCancha.filter(cancha => cancha.status === 'disponible');

    // Inicialmente muestra todas las canchas
    this.canchasFiltradas = this.datosCancha;
  }

  // Método para filtrar las canchas según el tipo y estado
  // si el tipo es una cadena vacía ('') muestra todas las canchas
  filtrarCanchas(tipo: string, estado: string = ''): void {
    this.filtroTipo = tipo;
    this.canchasFiltradas = this.datosCancha.filter((cancha) => {
      const cumpleConElTipo = tipo ? cancha.type === tipo : true;
      const cumpleConElEstado = estado ? cancha.status === estado : true;
      return cumpleConElTipo && cumpleConElEstado;
    });
  }

  obtenerDatos() {
    this.httpClient.get('http://localhost:3000/api/cancha').subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });

    /*this.apiService.getData().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });*/
  }

  getCanchaInfo(val: NCancha.CanchaData): void {
    console.log(val);
  }

  trackByFn(_index: number, item: NCancha.CanchaData) {
    //solo se renderiza el elemento modificado
    return item.id;
  }
}
