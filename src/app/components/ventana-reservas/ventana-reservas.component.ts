import { Component, OnInit } from '@angular/core';
import { CANCHA_DATA } from '../../../assets/canchas.js';
import { NCancha } from '../../models/cancha.models.js';
import { CanchasComponent } from '../canchas/canchas.component.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Cancha } from '../../models/lista-canchas.models.js';

@Component({
  selector: 'app-ventana-reservas',
  standalone: true,
  providers: [
    ApiService
  ],
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
  lista_canchas: Cancha[] = [];  // datos de todas las canchas
  //datosCancha: NCancha.CanchaData[] = CANCHA_DATA; // Todas las canchas
  //canchasFiltradas: NCancha.CanchaData[] = []; // Lista de canchas filtradas
  //filtroTipo: string = ''; // Variable para el tipo de cancha a filtrar

  constructor(
    private service: ApiService /*, private service: ApiService*/
  ) {}

  ngOnInit(): void {
    // para despues
    // Inicialmente, muestra solo las canchas en estado "disponible"
    //this.canchasFiltradas = this.datosCancha.filter(cancha => cancha.status === 'disponible');

    // Inicialmente muestra todas las canchas
    //this.canchasFiltradas = this.datosCancha;
    
    /*  
    this.service.getCanchas().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });
    */

  }

   // se llama del botón "Mostrar todas las canchas"
  getCanchas(): void {
    this.service.getCanchas().subscribe({
      next: (data) => {
        this.lista_canchas = data; // Asignamos los datos a lista_canchas
        console.log('Canchas:', this.lista_canchas);
      },
      error: (error) => {
        console.error('Error al obtener las canchas:', error);
      }
    });
  }

  trackByFn(_index: number, item: Cancha) {
    //solo se renderiza el elemento modificado
    return item.id;
  }
}
  // Método para filtrar las canchas según el tipo y estado
  // si el tipo es una cadena vacía ('') muestra todas las canchas
  /*
  filtrarCanchas(tipo: string, estado: string = ''): void {
    this.filtroTipo = tipo;
    this.canchasFiltradas = this.datosCancha.filter((cancha) => {
      const cumpleConElTipo = tipo ? cancha.type === tipo : true;
      const cumpleConElEstado = estado ? cancha.status === estado : true;
      return cumpleConElTipo && cumpleConElEstado;
    });
  }

 */

   /*this.apiService.getData().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
      },
      error: (error) => {
        console.error('Error al obtener datos:', error);
      },
    });*/

  
    /*
  getCanchaInfo(val: NCancha.CanchaData): void {
    console.log(val);
  }

  
}
*/