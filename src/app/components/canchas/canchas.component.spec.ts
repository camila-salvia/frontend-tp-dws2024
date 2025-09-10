import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CanchasComponent } from './canchas.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; //provee versiones falsas de prueba de router
import { ApiService } from '../../services/api.service';

describe('CanchasComponent', () => {
  let component: CanchasComponent;
  let fixture: ComponentFixture<CanchasComponent>;

  const mockCanchas = [
    {
      id: 1,
      estado: 'Disponible',
      canchaClass: {
        id: 1,
        precioHora: 10000,
        tipoCancha: 'Fútbol 5'
      }
    },
    {
      id: 2,
      estado: 'Disponible',
      canchaClass: {
        id: 2,
        precioHora: 15000,
        tipoCancha: 'Fútbol 7'
      }
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CanchasComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CanchasComponent);
    component = fixture.componentInstance;
    component.canchas = mockCanchas;
    fixture.detectChanges();
  });

  it('debería mostrar el listado de canchas', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(2);
  });

  it('debería mostrar detalles al hacer click en una cancha', () => {
    const title = fixture.debugElement.queryAll(By.css('h3'))[0];
    title.triggerEventHandler('click');
    fixture.detectChanges();

    const detalles = fixture.debugElement.query(By.css('.cancha-seleccionada'));
    expect(detalles).toBeTruthy();
    expect(component.canchaSeleccionada).toEqual(mockCanchas[0]);
  });

  it('debería guardar el id de la cancha seleccionada en localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.seleccionarCancha(mockCanchas[1].id);
    expect(localStorage.setItem).toHaveBeenCalledWith('idCanchaSeleccionada', mockCanchas[1].id.toString());
  });

  it('debería alternar la selección de detalles', () => {
    component.mostrarDetalles(mockCanchas[0]);
    expect(component.canchaSeleccionada).toEqual(mockCanchas[0]);
    component.mostrarDetalles(mockCanchas[0]);
    expect(component.canchaSeleccionada).toBeNull();
  });
});
