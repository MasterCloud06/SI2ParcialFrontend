  import { Component, OnInit } from '@angular/core';
  import { EspecialidadService } from '../../services/especialidades/especialidad.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-consulta-externa',
    templateUrl: './consulta-externa.component.html',
    styleUrls: ['./consulta-externa.component.scss']
  })
  export class ConsultaExternaComponent implements OnInit {
    especialidades: any[] = [];

    constructor(private especialidadService: EspecialidadService, private router: Router) { }

    ngOnInit(): void {
      this.obtenerEspecialidades();
    }

    obtenerEspecialidades(): void {
      this.especialidadService.getAllEspecialidades().subscribe(
        (data) => {
          this.especialidades = data;
        },
        (error) => {
          console.error('Error al obtener las especialidades', error);
        }
      );
    }

    verMedicos(especialidadId: number): void {
      this.router.navigate(['/medicos-disponibles', especialidadId]);
    }

  }
