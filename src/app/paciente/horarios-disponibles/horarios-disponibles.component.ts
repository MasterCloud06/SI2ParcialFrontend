import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioService } from '../../services/horario/horario.service';
import { Horario } from '../../models/horario.model';
import { Route } from '@angular/router';

@Component({
  selector: 'app-horarios-disponibles',
  templateUrl: './horarios-disponibles.component.html',
  styleUrls: ['./horarios-disponibles.component.scss']
})
export class HorariosDisponiblesComponent implements OnInit {
  horarios: Horario[] = []; // Inicializar como array vacío
  medicoId!: number;

  constructor(
    private horarioService: HorarioService,
    private route: ActivatedRoute,
    private router:Router,
  ) { }

  ngOnInit(): void {
    const medicoIdParam = this.route.snapshot.paramMap.get('medicoId');
    this.medicoId = medicoIdParam ? +medicoIdParam : 0;

    if (this.medicoId > 0) { // Check if medicoId is a valid number
      this.loadHorarios();
    } else {
      console.error('ID del médico no es válido.');
    }
  }


  loadHorarios(): void {
    this.horarioService.getHorariosByMedico(this.medicoId).subscribe(
      (data) => {
        this.horarios = data || []; // Asegurarse de asignar un array vacío si 'data' es null o indefinido
      },
      (error) => {
        console.error('Error al obtener horarios', error);
        this.horarios = []; // Asignar un array vacío en caso de error
      }
    );
  }

  seleccionarHorario(horarioId: number): void {
    this.router.navigate(['/paciente/ficha-atencion', horarioId]);
  }

}
