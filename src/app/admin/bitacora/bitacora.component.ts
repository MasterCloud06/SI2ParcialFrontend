import { Component, OnInit } from '@angular/core';
import { BitacoraService } from '../../services/bitacora/bitacora.service';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {
  acciones: string[] = [];

  constructor(private bitacoraService: BitacoraService) {}

  ngOnInit() {
    this.bitacoraService.obtenerAcciones().subscribe((acciones) => {
      this.acciones = acciones;
    });
  }
}
