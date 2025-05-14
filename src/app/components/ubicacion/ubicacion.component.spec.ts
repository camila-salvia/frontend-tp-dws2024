import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaUbicacionComponent } from './ubicacion.component';

describe('VentanaUbicacionComponent', () => {
  let component: VentanaUbicacionComponent;
  let fixture: ComponentFixture<VentanaUbicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaUbicacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
