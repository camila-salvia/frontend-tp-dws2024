import { Component, OnInit } from '@angular/core';
import { CanchasComponent } from '../canchas/canchas.component.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Cancha } from '../../models/lista-canchas.models.js';
import { CanchaService } from '../../services/cancha.service.js';

@Component({
  selector: 'app-ventana-reservas',
  standalone: true,
  providers: [ApiService],
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
  lista_canchas: Cancha[] = []; // datos de todas las canchas

  constructor(
    private canchaService: CanchaService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // para despues
    // Inicialmente, muestra solo las canchas en estado "disponible"
    //this.canchasFiltradas = this.datosCancha.filter(cancha => cancha.status === 'disponible');

    // Obtener canchas desde el servicio
    this.canchaService.canchas$.subscribe((canchas) => {
      this.lista_canchas = canchas; // Actualiza lista_canchas con los datos del servicio
    });
  }
  get hasCanchas(): boolean {
    return this.lista_canchas && this.lista_canchas.length > 0;
  }
  
  // Método para filtrar las canchas
  filtrarCanchas(tipo: string): void {
    this.lista_canchas = this.canchaService.getCanchas(tipo);
  }

  // se llama del botón "Mostrar todas las canchas"
  getCanchas() {
    this.apiService.getCanchas().subscribe({
      next: (response) => {
        // Verificar que la respuesta contiene la propiedad 'data' que es un arreglo
        if (response && Array.isArray(response.data)) {
          this.canchaService.setCanchas(response.data); // Pasar el arreglo de canchas al servicio
          console.log('Canchas guardadas en el servicio:', response.data);
        } else {
          console.error(
            'Error: no se encontraron canchas o la propiedad "data" no es un arreglo',
            response
          );
        }
      },
      error: (error) => {
        console.error('Error al obtener las canchas:', error);
      },
    });
  }

  trackByFn(_index: number, item: Cancha) {
    //solo se renderiza el elemento modificado
    return item.id;
  }
}
