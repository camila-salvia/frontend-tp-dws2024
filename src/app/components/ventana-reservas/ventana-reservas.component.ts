import { Component, OnInit } from '@angular/core';
import { CANCHA_DATA } from '../../../assets/canchas.js';
import { NCancha } from '../../models/cancha.models.js';
import { CanchasComponent } from '../canchas/canchas.component.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ventana-reservas',
  standalone: true,
  imports: [
    CanchasComponent,
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
  ],
  templateUrl: './ventana-reservas.component.html',
  styleUrl: './ventana-reservas.component.css'
})

export class VentanaReservasComponent implements OnInit{
  // VARIABLES
  datosCancha: NCancha.CanchaData[] = CANCHA_DATA; // Todas las canchas
  canchasFiltradas: NCancha.CanchaData[] = []; // Lista de canchas filtradas
  filtroTipo: string = ''; // Variable para el tipo de cancha a filtrar

  ngOnInit(): void {
  // Inicialmente, muestra solo las canchas en estado "disponible"
  this.canchasFiltradas = this.datosCancha.filter(cancha => cancha.status === 'disponible');
}

  // Método para filtrar las canchas según el tipo y estado
  // si el tipo es una cadena vacía ('') muestra todas las canchas
  filtrarCanchas(tipo: string, estado: string = ''): void {
    this.filtroTipo = tipo;
    this.canchasFiltradas = this.datosCancha.filter(cancha => {
    const cumpleConElTipo = tipo ? cancha.type === tipo : true;
    const cumpleConElEstado = estado ? cancha.status === estado : true;
    return cumpleConElTipo && cumpleConElEstado;
  });
  }

  getCanchaInfo(val: NCancha.CanchaData): void {
    console.log(val);
  }
  trackByFn(_index: number, item:NCancha.CanchaData){ //solo se renderiza el elemento modificado
    return item.id;
  }

}