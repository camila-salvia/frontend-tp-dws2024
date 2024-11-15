import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NCancha } from '../../models/cancha.models.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-canchas',
  standalone: true,
  providers: [
    ApiService
  ],
  imports: [
    CommonModule,
    RouterModule, // Recordar agregar siempre!!
    HttpClientModule
  ],
  templateUrl: './canchas.component.html',
  styleUrl: './canchas.component.css'
})
export class CanchasComponent {
  //lista_canchas: any[] = [];  // Aquí almacenaremos los datos recibidos del servicio
  @Input( { required:true } ) canchaData!:NCancha.CanchaData;
  @Output() onClickIcon = new EventEmitter<NCancha.CanchaData>();
 
}
