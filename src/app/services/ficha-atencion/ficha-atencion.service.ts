import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FichaAtencion } from '../../models/ficha-atencion.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FichaAtencionService {
  private baseUrl = `${environment.apiUrl}/fichas`;

  constructor(private http: HttpClient) {}

  getFichaAtencionById(fichaId: number): Observable<FichaAtencion> {
    return this.http.get<FichaAtencion>(`${this.baseUrl}/${fichaId}`);
  }
}
