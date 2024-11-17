import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteResultadosComponent } from './resultados.component';

describe('PacienteResultadosComponent', () => {
  let component: PacienteResultadosComponent;
  let fixture: ComponentFixture<PacienteResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PacienteResultadosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load resultados on init', () => {
    component.cargarResultados();
    expect(component.resultados.length).toBeGreaterThan(0);
  });
});
