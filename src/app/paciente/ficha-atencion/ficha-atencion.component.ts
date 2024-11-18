import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FichaAtencionService } from '../../services/ficha-atencion/ficha-atencion.service';
import { FichaAtencion } from '../../models/ficha-atencion.model';

@Component({
  selector: 'app-ficha-atencion',
  templateUrl: './ficha-atencion.component.html',
  styleUrls: ['./ficha-atencion.component.scss']
})
export class FichaAtencionComponent implements OnInit {
  ficha!: FichaAtencion; // Modelo específico para la ficha

  constructor(
    private route: ActivatedRoute,
    private fichaAtencionService: FichaAtencionService
  ) {}

  ngOnInit(): void {
    const fichaId = this.route.snapshot.paramMap.get('fichaId');
    if (fichaId) {
      this.loadFicha(parseInt(fichaId, 10));
    }
  }

  loadFicha(fichaId: number): void {
    this.fichaAtencionService.getFichaAtencionById(fichaId).subscribe(
      (data) => {
        this.ficha = data;
      },
      (error) => {
        console.error('Error al cargar la ficha:', error);
      }
    );
  }
}
