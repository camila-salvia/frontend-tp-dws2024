import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaCanchasComponent } from './ventana-canchas.component';

describe('VentanaCanchasComponent', () => {
  let component: VentanaCanchasComponent;
  let fixture: ComponentFixture<VentanaCanchasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaCanchasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaCanchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
