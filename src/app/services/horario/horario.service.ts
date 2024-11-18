import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../../models/horario.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseUrl = `${environment.apiUrl}/horarios`;

  constructor(private http: HttpClient) { }

  getHorariosByMedico(medicoId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/medico/${medicoId}`);
  }

}
