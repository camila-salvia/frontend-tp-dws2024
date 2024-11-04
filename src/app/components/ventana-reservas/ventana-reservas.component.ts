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
  datosCancha: NCancha.CanchaData[] = CANCHA_DATA;
  ngOnInit(): void {
    console.log(this.datosCancha);  // Verifica que CANCHA_DATA contiene los datos esperados --> Los tiene
  }
  getCanchaInfo(val: NCancha.CanchaData): void {
    console.log(val);
  }
  trackByFn(_index: number, item:NCancha.CanchaData){ //solo se renderiza el elemento modificado
    return item.id;
  }
/*
  datosCancha = CANCHA_DATA;
  getCanchaInfo(val: NCancha.CanchaData){
    console.log(val);
  }
*/
}