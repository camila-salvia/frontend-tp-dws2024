import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaReservasComponent } from './ventana-reservas.component';

describe('VentanaReservasComponent', () => {
  let component: VentanaReservasComponent;
  let fixture: ComponentFixture<VentanaReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
