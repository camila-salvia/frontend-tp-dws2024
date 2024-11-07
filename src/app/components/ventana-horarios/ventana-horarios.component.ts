import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Agregar FormsModule

@Component({
  selector: 'app-ventana-horarios',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule, // Importar FormsModule aquí
  ],
  templateUrl: './ventana-horarios.component.html',
  styleUrls: ['./ventana-horarios.component.css'],
})
export class VentanaHorariosComponent {
  fechaSeleccionada: string | null = null;
  horaSeleccionada: string | null = null;
  botonHabilitado: boolean = false;

  verificarSeleccion() {
    // El botón se habilita solo si tanto la fecha como la hora están seleccionadas
    this.botonHabilitado = !!this.fechaSeleccionada && !!this.horaSeleccionada;
  }
}
