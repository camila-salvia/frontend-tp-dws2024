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

  mensajeErrorReserva: string | null = null; // Mensaje de error para reservas

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

    const idReservaSeleccionada = localStorage.getItem('idReservaSeleccionada');
    if (idReservaSeleccionada) {
      this.reserva_articulo.idReserva = Number(idReservaSeleccionada);
    }

    console.log('ID de reserva seleccionada:', this.reserva_articulo.idReserva);
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
  // Validar si ya está reservado
  if (articulo.articuloClass.estado === 'Reservado') {
    this.mensajeErrorReserva = '❌ El artículo seleccionado ya está reservado.';
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      this.mensajeErrorReserva = null;
    }, 3000);
    return;
  }
  const reservaId = localStorage.getItem('reservaId');

  if (reservaId) {
    const nuevaReservaArticulo: ReservaArticulo = {
      idArticulo: articulo.id,
      idReserva: Number(reservaId),
    };

    console.log('Reservando artículo con:', nuevaReservaArticulo);

    this.apiService.reservarArticulo(nuevaReservaArticulo).subscribe({
      next: (response) => {
        console.log('✅ Artículo reservado con éxito:', response);
        this.articuloReservado = true;

        // Actualizar estado del artículo
        this.apiService.updateArticuloStatus(articulo.id, 'Reservado').subscribe({
          next: (updateResponse) => {
            console.log('✅ Estado del artículo actualizado:', updateResponse);
          },
          error: (updateError) => {
            console.error('❌ Error al actualizar estado del artículo:', updateError);
          },
        });

        // Esperar y recargar
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      error: (error) => {
        console.error('❌ Error al reservar el artículo:', error);
      },
    });

  } else {
    console.error('❌ Error: idReserva no encontrado en localStorage');
    alert('Debés seleccionar una reserva antes de reservar un artículo.');
  }
}

}
