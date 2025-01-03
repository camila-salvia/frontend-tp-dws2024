import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Articulo } from '../../models/lista-articulos.models.js';
import { ArticuloService } from '../../services/articulo.service.js';

@Component({
  selector: 'app-ventana-articulos',
  standalone: true,
  providers: [ApiService],
  imports: [
    RouterModule, // Recordar agregar siempre!!
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './ventana-articulos.component.html',
  styleUrl: './ventana-articulos.component.css',
})
export class ArticulosComponent implements OnInit {
  lista_articulos: Articulo[] = []; // arreglo de canchas

  constructor(
    private articuloService: ArticuloService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.apiService.getArticulos().subscribe({
      next: (response) => {
        if (response && Array.isArray(response.data)) {
          // Verificar que la respuesta contiene la propiedad 'data' que es un arreglo
          this.articuloService.setArticulos(response.data); // Pasar el arreglo de canchas al servicio
          console.log('Articulos guardadas en el servicio:', response.data);
        } else {
          console.error(
            'Error: no se encontraron articulos o la propiedad "data" no es un arreglo',
            response
          );
        }
      },
      error: (error) => {
        console.error('Error al obtener las articulos:', error);
      },
    });
    // Obtener canchas desde el servicio
    this.articuloService.articulos$.subscribe((articulos) => {
      this.lista_articulos = articulos; // Actualiza lista_canchas con los datos del servicio
      console.log('reservas oninit');
    });
  }

  mostrarTodos(): void {
    this.lista_articulos = this.articuloService.getArticulos(); // Sin filtros
  }

  articuloSeleccionado: Articulo | null = null;

  mostrarDetalles(articulo: Articulo): void {
    if (this.articuloSeleccionado === articulo) {
      this.articuloSeleccionado = null; // Ocultar detalles si se hace clic de nuevo
    } else {
      this.articuloSeleccionado = articulo; // Mostrar detalles de la nueva cancha
    }
  }

  trackByFn(_index: number, item: Articulo) {
    //solo se renderiza el elemento modificado
    return item.id;
  }
}
