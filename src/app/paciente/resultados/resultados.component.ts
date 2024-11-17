import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paciente-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class PacienteResultadosComponent implements OnInit {
  resultados: any[] = []; // Aquí irán los resultados obtenidos de un servicio (simulación)

  constructor() {}

  ngOnInit(): void {
    this.cargarResultados(); // Cargar resultados al inicializar
  }

  cargarResultados() {
    this.resultados = [
      { fecha: '2024-10-01', tipo: 'Sangre', resultado: 'Normal' },
      { fecha: '2024-09-15', tipo: 'Orina', resultado: 'Anormal' },
    ];
  }
}
