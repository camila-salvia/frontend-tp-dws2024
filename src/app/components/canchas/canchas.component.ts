import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NCancha } from '../../models/cancha.models.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { Cancha } from '../../models/lista-canchas.models.js';

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
  @Input() canchaData!: Cancha;
  //@Output() onClickIcon = new EventEmitter<NCancha.CanchaData>();
  constructor() {}
}
