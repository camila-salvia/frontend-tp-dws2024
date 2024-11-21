import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, input } from '@angular/core';
import { NCancha } from '../../models/cancha.models.js';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClientModule } from '@angular/common/http';
import { Cancha } from '../../models/lista-canchas.models.js';
import { CanchaService } from '../../services/cancha.service.js';

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
export class CanchasComponent implements OnInit{
  @Input() canchas: Cancha[] = []; //Recibe el array
  
  constructor() {}

  ngOnInit(): void {
    console.log('Canchas en el hijo:', this.canchas);
  }
}
