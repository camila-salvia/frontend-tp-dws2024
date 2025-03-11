import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Articulo } from '../../models/lista-articulos.models.js';
import { ArticuloService } from '../../services/articulo.service.js';
import { ReservaArticulo } from '../../models/reserva-articulo.models.js';
import { Reserva } from '../../models/lista-reservas.models';

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
  styleUrls: ['./ventana-articulos.component.css'],
})
export class ArticulosComponent implements OnInit {
  lista_articulos: Articulo[] = []; // arreglo de canchas
  articuloReservado: boolean = false;

  reserva_articulo: ReservaArticulo = {
    idArticulo: 0,
    idReserva: 0,
  };

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
          console.log('Articulos guardados en el servicio:', response.data);
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

    this.reserva_articulo = {
      idReserva: 0,
      idArticulo: 0,
    };
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

  reservarArticulo(articulo: Articulo): void {
    const reservaId = this.apiService.getCurrentReservaId(); // Obtener el id de la reserva actual
    console.log('ID de la reserva obtenida:', reservaId);
    console.log(localStorage.getItem('reservaId'));

    if (reservaId !== undefined && reservaId !== null) {
      console.error('Error: idReserva no está definido o es nulo');
    } else {
      // Crear el objeto correctamente
      const nuevaReservaArticulo: ReservaArticulo = {
        idArticulo: articulo.id,
        idReserva: Number(reservaId), // Convertir a número si es necesario
      };

      console.log('Reservando artículo con:', nuevaReservaArticulo);

      // Enviar la reserva a la API
      this.apiService.reservarArticulo(nuevaReservaArticulo).subscribe({
        next: (response) => {
          console.log('Artículo reservado con éxito:', response);
          this.articuloReservado = true;
          // Actualizar el estado del artículo a 'Reservado'
          this.apiService
            .updateArticuloStatus(articulo.id, 'Reservado')
            .subscribe({
              next: (updateResponse) => {
                console.log(
                  'Estado del artículo actualizado con éxito:',
                  updateResponse
                );
                // Actualizar la lista de artículos en el servicio
                //this.articuloService.updateArticulo(articulo.id, { status: 'Reservado' });
              },
              error: (updateError) => {
                console.error(
                  'Error al actualizar el estado del artículo:',
                  updateError
                );
              },
            });
        },
        error: (error) => {
          console.error('Error al reservar el artículo:', error);
        },
      });
    }
  }
}
