import { Component, OnInit } from '@angular/core';
import { CANCHA_DATA } from '../../../assets/canchas.js';
import { NCancha } from '../../models/cancha.models.js';
import { CanchasComponent } from '../canchas/canchas.component.js';

@Component({
  selector: 'app-ventana-reservas',
  standalone: true,
  imports: [
    CanchasComponent
  ],
  templateUrl: './ventana-reservas.component.html',
  styleUrl: './ventana-reservas.component.css'
})

export class VentanaReservasComponent{
  ngOnInit() {
  console.log(this.datosCancha); // Esto debería mostrar el array de canchas en la consola
}
  //canchasFutbol7 = [];
  //canchasFutbol11 = [];

  datosCancha = CANCHA_DATA;
  getCanchaInfo(val: NCancha.CanchaData){
    console.log(val);
  }
  trackByFn(_index: number, item:NCancha.CanchaData){ //solo se renderiza el elemento modificado
    return item.id;
  }
}


  /*
  ngOnInit() {
    this.cargarCanchasPorTipo();
  }

  cargarCanchasPorTipo() {
    this.canchasFutbol7 = CANCHA_DATA.filter(c => c.tipo === 'futbol 7');
    this.canchasFutbol11 = CANCHA_DATA.filter(c => c.tipo === 'futbol 11');
  }
*/