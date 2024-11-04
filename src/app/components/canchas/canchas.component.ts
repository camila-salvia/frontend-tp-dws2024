import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NCancha } from '../../models/cancha.models.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-canchas',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './canchas.component.html',
  styleUrl: './canchas.component.css'
})
export class CanchasComponent {
  @Input( { required:true } ) canchaData!:NCancha.CanchaData;
  @Output() onClickIcon = new EventEmitter<NCancha.CanchaData>();
}
