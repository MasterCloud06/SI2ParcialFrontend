  import { Component, OnInit } from '@angular/core';
  import { UserService } from '../../services/user/user.service';
  import { ActivatedRoute,Router } from '@angular/router';
  import { User } from 'src/app/models/user.model';

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
      private route: ActivatedRoute,
      private router:Router
    ) { }

    ngOnInit(): void {
      this.especialidadId = +this.route.snapshot.paramMap.get('especialidadId')!;
      this.loadMedicos();
    }

    loadMedicos(): void {
      this.userService.getMedicosByEspecialidad(this.especialidadId).subscribe(
        (data) => {
          console.log('Datos de médicos recibidos:', data); // Verifica la estructura de los datos
          this.medicos = data;
        },
        (error) => {
          console.error('Error al obtener médicos', error);
        }
      );
    }


    seleccionarMedico(medico: User): void {
      if (medico.idMedico) { // Asegúrate de que esta propiedad esté disponible
        this.router.navigate(['/paciente/horarios-disponibles', medico.idMedico]);
      } else {
        console.error('ID del médico no es válido.');
      }
    }


  }
