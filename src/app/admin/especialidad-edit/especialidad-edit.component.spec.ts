import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadEditComponent } from './especialidad-edit.component';

describe('EspecialidadEditComponent', () => {
  let component: EspecialidadEditComponent;
  let fixture: ComponentFixture<EspecialidadEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialidadEditComponent]
    });
    fixture = TestBed.createComponent(EspecialidadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
