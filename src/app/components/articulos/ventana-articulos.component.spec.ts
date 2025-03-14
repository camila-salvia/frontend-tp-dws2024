import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticulosComponent } from './ventana-articulos.component';

describe('ArticulosComponent', () => {
  let component: ArticulosComponent;
  let fixture: ComponentFixture<ArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticulosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
