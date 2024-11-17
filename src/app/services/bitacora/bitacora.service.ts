// src/app/services/bitacora.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private acciones: string[] = [];
  private accionesSubject = new BehaviorSubject<string[]>(this.acciones);

  registrarAccion(accion: string) {
    const fecha = new Date();
    const registro = `${fecha.toLocaleString()}: ${accion}`;
    this.acciones.unshift(registro); // Agregar al inicio
    this.accionesSubject.next(this.acciones);
  }

  obtenerAcciones() {
    return this.accionesSubject.asObservable();
  }
}
