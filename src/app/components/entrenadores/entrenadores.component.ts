import { Component, Input } from '@angular/core';
import { NsEntrenadores } from '../../models/entrenadores.models.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrenadores',
  standalone: true,
  imports: [],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.css'
})
export class EntrenadoresComponent {
  @Input({ required:true }) lista_entrenadores!: NsEntrenadores.Entrenadores;
}
