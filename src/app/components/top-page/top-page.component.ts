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
export class TopPageComponent {
  usuarioLogueado: any = null;

  ngOnInit(): void {
    const user = localStorage.getItem('usuarioLogueado');
    if (user) {
      this.usuarioLogueado = JSON.parse(user);
      console.log('Sesión iniciada:', this.usuarioLogueado);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioLogueado');
    this.usuarioLogueado = null;
    console.log('Sesión cerrada');
    window.location.href = '/'; // o Router.navigate()
}

}
