import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medicos-disponibles',
  templateUrl: './medicos-disponibles.component.html',
  styleUrls: ['./medicos-disponibles.component.scss']
})
export class MedicosDisponiblesComponent implements OnInit {
  medicos: User[] = [];
  especialidadId!: number;
  displayedColumns: string[] = ['username', 'email', 'acciones'];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.especialidadId = +this.route.snapshot.paramMap.get('especialidadId')!;
    this.loadMedicos();
  }

  loadMedicos(): void {
    this.userService.getMedicosByEspecialidad(this.especialidadId).subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al obtener médicos', error);
      }
    );
  }

  seleccionarMedico(medico: User): void {
    console.log('Médico seleccionado:', medico);
  }
}
