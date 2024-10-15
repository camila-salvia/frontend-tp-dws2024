import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopPageComponent } from './components/top-page/top-page.component.js';
import { CanchasComponent } from './components/canchas/canchas.component.js';
import { CANCHA_DATA } from '../assets/canchas.js'
import { NCancha } from './models/cancha.models.js';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./components/footer/footer.component";
import { EntrenadoresComponent } from "./components/entrenadores/entrenadores.component";
import { mis_entrenadores } from '../assets/entrenadores.js';
import { NsEntrenadores } from './models/entrenadores.models.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopPageComponent,
    CanchasComponent,
    CommonModule,
    FooterComponent,
    EntrenadoresComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  datosCancha = CANCHA_DATA;
  getCanchaInfo(val: NCancha.CanchaData){
    console.log(val);
  }
  trackByFn(_index: number, item:NCancha.CanchaData){ //solo se renderiza el elemento modificado
    return item.id;
  }
  
  lista_entrenadores = mis_entrenadores;
}
