// src/app/inicio/inicio.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioComponent } from './inicio.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { Router } from '@angular/router';

// Declaración del componente dummy antes del TestBed
@Component({ template: '' })
class DummyLoginComponent {}

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InicioComponent,
        DummyLoginComponent // Añadido aquí
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '/inicio', component: DummyLoginComponent } // Ruta para el componente dummy
        ])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener una lista de servicios', () => {
    expect(component.servicios.length).toBeGreaterThan(0);
  });

  it('debería alternar el menú al hacer clic en el botón hamburguesa', () => {
    const navLinks: DebugElement = fixture.debugElement.query(By.css('.nav-links'));
    const hamburger: DebugElement = fixture.debugElement.query(By.css('.hamburger'));

    expect(navLinks.classes['active']).toBeFalse();

    hamburger.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.menuActivo).toBeTrue();
    expect(navLinks.classes['active']).toBeTrue();

    hamburger.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.menuActivo).toBeFalse();
    expect(navLinks.classes['active']).toBeFalse();
  });

  it('debería mostrar los títulos de los servicios', () => {
    const serviceTitles: DebugElement[] = fixture.debugElement.queryAll(By.css('.service-cards .card h3'));
    expect(serviceTitles.length).toBe(component.servicios.length);
    component.servicios.forEach((servicio, index) => {
      expect(serviceTitles[index].nativeElement.textContent).toContain(servicio.titulo);
    });
  });

  it('debería tener enlaces accesibles en el menú', () => {
    const links: DebugElement[] = fixture.debugElement.queryAll(By.css('.nav-links a'));
    links.forEach(link => {
      expect(link.attributes['href'] || link.attributes['ng-reflect-router-link']).toBeTruthy();
    });
  });

  it('debería tener botones de redes sociales con atributos correctos', () => {
    const socialLinks: DebugElement[] = fixture.debugElement.queryAll(By.css('.social-media a'));
    socialLinks.forEach(link => {
      expect(link.attributes['href']).toContain('http');
      expect(link.attributes['target']).toBe('_blank');
      expect(link.attributes['rel']).toBe('noopener noreferrer');
    });
  });

  it('debería navegar a /login al hacer clic en PORTAL PACIENTES', () => {
    const navigateSpy = spyOn(router, 'navigate');

    const portalLink: DebugElement = fixture.debugElement.query(By.css('a[routerLink="/auth/inicio"]'));
    portalLink.triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['/inicio']);
  });
});
