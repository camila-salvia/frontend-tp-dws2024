import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Importa el array desde app.routes.ts
import { AppComponent } from './app/app.component';
import { VentanaReservasComponent } from './app/components/ventana-reservas/ventana-reservas.component.js';

//bootstrapApplication(AppComponent, appConfig) // Esto venía (o lo puse yo copiando) y lo saqué
  //.catch((err) => console.error(err)); //No se si está bien pero funciona igual

  bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)  // Usa el array de rutas exportado
  ]
})
.catch(err => console.error(err));