import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngresoReservaComponent } from './ingreso-reserva.component';

describe('VentanaReservasComponent', () => {
  let component: IngresoReservaComponent;
  let fixture: ComponentFixture<IngresoReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoReservaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
