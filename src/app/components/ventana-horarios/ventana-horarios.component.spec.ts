import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaHorariosComponent } from './ventana-horarios.component';

describe('VentanaHorariosComponent', () => {
  let component: VentanaHorariosComponent;
  let fixture: ComponentFixture<VentanaHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaHorariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
