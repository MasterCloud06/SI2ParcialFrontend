import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadCreateComponent } from './especialidad-create.component';

describe('EspecialidadCreateComponent', () => {
  let component: EspecialidadCreateComponent;
  let fixture: ComponentFixture<EspecialidadCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialidadCreateComponent]
    });
    fixture = TestBed.createComponent(EspecialidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
