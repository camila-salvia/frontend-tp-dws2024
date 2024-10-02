import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopPageComponent } from './components/top-page/top-page.component.js';
import { CanchasComponent } from './components/canchas/canchas.component.js';
import { CANCHA_DATA } from '../assets/canchas.js'
import { NCancha } from './models/models.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopPageComponent,
    CanchasComponent,
    CommonModule
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
}
