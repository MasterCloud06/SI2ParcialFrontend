import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Especialidad {
  idEspecialidad: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  private baseUrl = 'http://localhost:8080/api/especialidades'; // Asegúrate de que esta URL coincide con tu backend

  constructor(private http: HttpClient) {}

  // Obtener todas las especialidades
  getAllEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.baseUrl}`);
  }

  // Obtener una especialidad por ID
  getEspecialidadById(idEspecialidad: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.baseUrl}/${idEspecialidad}`);
  }

  // Crear una nueva especialidad
  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${this.baseUrl}`, especialidad);
  }

  // Actualizar una especialidad existente
  updateEspecialidad(idEspecialidad: number, especialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.baseUrl}/${idEspecialidad}`, especialidad);
  }

  // Eliminar una especialidad
  deleteEspecialidad(idEspecialidad: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idEspecialidad}`);
  }
}
