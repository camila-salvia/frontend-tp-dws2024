import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaHomeComponent } from './ventana-home.component';

describe('VentanaHomeComponent', () => {
  let component: VentanaHomeComponent;
  let fixture: ComponentFixture<VentanaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentanaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
