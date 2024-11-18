import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/api/users/MEDICO';

  constructor(private http: HttpClient) {}

  getMedicosPorEspecialidad(especialidadId: number): Observable<any> {
    // Usa una URL con parámetros claros
    return this.http.get<any>(`${this.apiUrl}/especialidades/${especialidadId}`);
  }
}

