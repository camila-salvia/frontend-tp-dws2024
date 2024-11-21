import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TopPageComponent } from './components/top-page/top-page.component.js';
import { CanchasComponent } from './components/canchas/canchas.component.js';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { VentanaReservasComponent } from './components/ventana-reservas/ventana-reservas.component.js';
import { routes } from './app.routes.js';
import { VentanaHomeComponent } from './components/ventana-home/ventana-home.component.js';
import { HttpClientModule } from '@angular/common/http';
import { SobreNosotrosComponent } from './ventana-sobre-nosotros-component/sobre-nosotros.component.js';
import { ApiService } from './services/api.service.js';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [
    ApiService
  ],
  imports: [
    HttpClientModule,
    RouterOutlet,
    RouterModule,
    TopPageComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /*
  datosCancha = CANCHA_DATA;
  getCanchaInfo(val: NCancha.CanchaData){
    console.log(val);
  }
  trackByFn(_index: number, item:NCancha.CanchaData){ //solo se renderiza el elemento modificado
    return item.id;
  }
  
  lista_entrenadores = mis_entrenadores;
  */
}
