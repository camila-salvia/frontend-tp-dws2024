import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventana-home',
  standalone: true,
  imports: [
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
  ],
  templateUrl: './ventana-home.component.html',
  styleUrl: './ventana-home.component.css'
})
export class VentanaHomeComponent {

}
