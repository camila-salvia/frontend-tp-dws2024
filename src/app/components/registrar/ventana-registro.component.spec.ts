import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaRegistroComponent } from './ventana-registro.component';

describe('VentanaRegistroComponent', () => {
  let component: VentanaRegistroComponent;
  let fixture: ComponentFixture<VentanaRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaRegistroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VentanaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
