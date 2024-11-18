import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicoService } from '../services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  especialidadId!: number;

  constructor(private route: ActivatedRoute, private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('especialidadId');
      if (id && !isNaN(+id)) {
        this.especialidadId = +id;
        this.obtenerMedicos();
      } else {
        console.error('especialidadId no está definido o no es un número válido');
      }
    });
  }

  obtenerMedicos(): void {
    this.medicoService.getMedicosPorEspecialidad(this.especialidadId).subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al obtener los médicos', error);
      }
    );
  }
}
