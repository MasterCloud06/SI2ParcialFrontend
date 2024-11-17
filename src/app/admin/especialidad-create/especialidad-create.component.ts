import { Component, OnInit } from '@angular/core';
import { EspecialidadService, Especialidad } from '../../services/especialidades/especialidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BitacoraService } from '../../services/bitacora/bitacora.service'; // Importa el servicio de bitácora

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
    private snackBar: MatSnackBar,
    private bitacoraService: BitacoraService // Inyecta el servicio de bitácora
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

          // Registra la acción en la bitácora después de la creación exitosa
          this.bitacoraService.registrarAccion(`Se creó una nueva especialidad: ${newEspecialidad.nombre}`);

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
