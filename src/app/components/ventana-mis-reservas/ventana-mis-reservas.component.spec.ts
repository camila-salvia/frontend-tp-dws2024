import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaMisReservasComponent } from './ventana-mis-reservas.component';

describe('VentanaMisReservasComponent', () => {
  let component: VentanaMisReservasComponent;
  let fixture: ComponentFixture<VentanaMisReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaMisReservasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaMisReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
