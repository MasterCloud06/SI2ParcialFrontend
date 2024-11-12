import { Component, OnInit } from '@angular/core';
import { EspecialidadService, Especialidad } from '../../services/especialidades/especialidad.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.scss'],
})
export class EspecialidadListComponent implements OnInit {
  especialidades: Especialidad[] = [];
  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'descripcion', 'acciones'];

  constructor(
    private especialidadService: EspecialidadService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  loadEspecialidades(): void {
    this.especialidadService.getAllEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al obtener especialidades', error);
        this.snackBar.open('Error al cargar especialidades', 'Cerrar', { duration: 3000 });
      }
    );
  }

  createEspecialidad(): void {
    this.router.navigate(['/admin/especialidades/create']);
  }

  editEspecialidad(idEspecialidad: number): void {
    console.log('ID de especialidad para editar:', idEspecialidad);
    this.router.navigate(['/admin/especialidades/edit', idEspecialidad]);
  }

  deleteEspecialidad(idEspecialidad: number): void {
    if (confirm('¿Estás seguro de eliminar esta especialidad?')) {
      this.especialidadService.deleteEspecialidad(idEspecialidad).subscribe(
        () => {
          this.snackBar.open('Especialidad eliminada correctamente', 'Cerrar', { duration: 3000 });
          this.loadEspecialidades();
        },
        (error) => {
          console.error('Error al eliminar especialidad', error);
          this.snackBar.open('Error al eliminar especialidad', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
