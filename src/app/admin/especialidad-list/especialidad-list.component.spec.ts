import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadListComponent } from './especialidad-list.component';

describe('EspecialidadListComponent', () => {
  let component: EspecialidadListComponent;
  let fixture: ComponentFixture<EspecialidadListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialidadListComponent]
    });
    fixture = TestBed.createComponent(EspecialidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
