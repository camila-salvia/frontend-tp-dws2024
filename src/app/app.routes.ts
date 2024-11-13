import { Routes } from '@angular/router';
import { AppComponent } from './app.component.js';
import { VentanaReservasComponent } from './components/ventana-reservas/ventana-reservas.component.js';
import { CanchasComponent } from './components/canchas/canchas.component.js';
import { VentanaHomeComponent } from './components/ventana-home/ventana-home.component.js';
import { VentanaHorariosComponent } from './components/ventana-horarios/ventana-horarios.component.js';

export const routes: Routes = [
  { path: '', component: VentanaHomeComponent }, // Página principal
  { path: 'reservas', component: VentanaReservasComponent },
  { path: 'canchas', component: CanchasComponent },
  { path: 'horarios/:id', component: VentanaHorariosComponent },
];
