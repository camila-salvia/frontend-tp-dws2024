import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NCancha } from '../../models/cancha.models.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-canchas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
  ],
  templateUrl: './canchas.component.html',
  styleUrl: './canchas.component.css'
})
export class CanchasComponent {
  @Input( { required:true } ) canchaData!:NCancha.CanchaData;
  @Output() onClickIcon = new EventEmitter<NCancha.CanchaData>();
 
  @Input() cancha!: NCancha.CanchaData;  // O el tipo correcto de cancha
  @Output() seleccionarCancha = new EventEmitter<number>(); // Emitirá el id de la cancha seleccionada

  onTituloClick() {
    this.seleccionarCancha.emit(this.cancha.id); // Emite el ID al componente padre
  }
}
