import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaMiCuentaComponent } from './mi-cuenta.component';

describe('TopPageComponent', () => {
  let component: VentanaMiCuentaComponent;
  let fixture: ComponentFixture<VentanaMiCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaMiCuentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaMiCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
