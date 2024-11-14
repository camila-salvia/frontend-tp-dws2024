import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { SobreNosotrosComponent } from '../../ventana-sobre-nosotros-component/sobre-nosotros.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-page',
  standalone: true,
  imports: [
    RouterModule, // Remember to always add this!!
    CommonModule,
  ],
  templateUrl: './top-page.component.html',
  styleUrl: './top-page.component.css',
})
export class TopPageComponent {}
