import { Component, OnInit } from '@angular/core';
import { EspecialidadService, Especialidad } from '../../services/especialidades/especialidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-especialidad-create',
  templateUrl: './especialidad-create.component.html',
  styleUrls: ['./especialidad-create.component.scss'],
})
export class EspecialidadCreateComponent implements OnInit {
  especialidadForm!: FormGroup;

  constructor(
    private especialidadService: EspecialidadService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.especialidadForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.especialidadForm.valid) {
      const newEspecialidad: Especialidad = this.especialidadForm.value;
      this.especialidadService.createEspecialidad(newEspecialidad).subscribe(
        () => {
          this.snackBar.open('Especialidad creada correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin/especialidades']);
        },
        (error) => {
          console.error('Error al crear especialidad', error);
          this.snackBar.open('Error al crear especialidad', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/especialidades']);
  }
}
