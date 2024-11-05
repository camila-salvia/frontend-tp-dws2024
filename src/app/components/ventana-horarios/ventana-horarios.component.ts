import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventana-horarios',
  standalone: true,
  imports: [
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
  ],
  templateUrl: './ventana-horarios.component.html',
  styleUrl: './ventana-horarios.component.css'
})
export class VentanaHorariosComponent {

}
