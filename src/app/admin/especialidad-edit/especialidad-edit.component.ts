import { Component, OnInit } from '@angular/core';
import { EspecialidadService, Especialidad } from '../../services/especialidades/especialidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BitacoraService } from '../../services/bitacora/bitacora.service'; // Importa el servicio de bitácora

@Component({
  selector: 'app-especialidad-edit',
  templateUrl: './especialidad-edit.component.html',
  styleUrls: ['./especialidad-edit.component.scss'],
})
export class EspecialidadEditComponent implements OnInit {
  especialidadForm!: FormGroup;
  especialidadId!: number | null;

  constructor(
    private especialidadService: EspecialidadService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private bitacoraService: BitacoraService // Inyecta el servicio de bitácora
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('idEspecialidad');
    console.log('ID obtenido de la ruta:', idParam); // Verificar ID en consola

    this.especialidadId = idParam && !isNaN(Number(idParam)) ? Number(idParam) : null;

    if (this.especialidadId !== null && this.especialidadId > 0) {
      this.initializeForm();
      this.loadEspecialidad();
    } else {
      console.error("ID inválido: no se pudo cargar la especialidad con el ID proporcionado.");
      this.snackBar.open('ID inválido para la especialidad', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/admin/especialidades']);
    }
  }

  // Initialize an empty form
  initializeForm(especialidad: Especialidad = { idEspecialidad: this.especialidadId ?? 0, nombre: '', descripcion: '' }): void {
    this.especialidadForm = this.fb.group({
      nombre: [especialidad.nombre, [Validators.required]],
      descripcion: [especialidad.descripcion, [Validators.required]],
    });
  }

  // Load especialidad data from the service
  loadEspecialidad(): void {
    if (this.especialidadId) {
      this.especialidadService.getEspecialidadById(this.especialidadId).subscribe(
        (data) => {
          if (data) {
            this.especialidadForm.patchValue({
              nombre: data.nombre,
              descripcion: data.descripcion,
            });
          } else {
            console.error('No se encontraron datos para el ID proporcionado');
            this.snackBar.open('No se encontró la especialidad', 'Cerrar', { duration: 3000 });
            this.router.navigate(['/admin/especialidades']);
          }
        },
        (error) => {
          console.error('Error al cargar especialidad', error);
          this.snackBar.open('Error al cargar especialidad', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/admin/especialidades']);
        }
      );
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.especialidadForm.valid && this.especialidadId) {
      const updatedEspecialidad: Especialidad = {
        idEspecialidad: this.especialidadId,
        nombre: this.especialidadForm.value.nombre,
        descripcion: this.especialidadForm.value.descripcion,
      };
      this.especialidadService.updateEspecialidad(this.especialidadId, updatedEspecialidad).subscribe(
        () => {
          this.snackBar.open('Especialidad actualizada correctamente', 'Cerrar', { duration: 3000 });

          // Registra la acción en la bitácora después de la actualización exitosa
          this.bitacoraService.registrarAccion(`Especialidad actualizada: ${updatedEspecialidad.nombre}`);

          this.router.navigate(['/admin/especialidades']);
        },
        (error) => {
          console.error('Error al actualizar especialidad', error);
          this.snackBar.open('Error al actualizar especialidad', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  // Handle cancel button
  cancel(): void {
    this.router.navigate(['/admin/especialidades']);
  }
}
