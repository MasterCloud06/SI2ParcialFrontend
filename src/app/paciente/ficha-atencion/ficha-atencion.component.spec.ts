import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaAtencionComponent } from './ficha-atencion.component';

describe('FichaAtencionComponent', () => {
  let component: FichaAtencionComponent;
  let fixture: ComponentFixture<FichaAtencionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaAtencionComponent]
    });
    fixture = TestBed.createComponent(FichaAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
