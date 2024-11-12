// src/app/services/profile/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfile } from '../../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users/{id}/profile'; // URL para acceder al perfil del backend

  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario
  getUserProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento
    if (!token) {
      return throwError('No se encontró el token');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<UserProfile>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        return throwError(error);
      })
    );
  }

  // Actualizar el perfil del usuario
  updateUserProfile(profile: UserProfile): Observable<UserProfile> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('No se encontró el token');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<UserProfile>(this.apiUrl, profile, { headers }).pipe(
      catchError((error) => {
        console.error('Error al actualizar el perfil del usuario:', error);
        return throwError(error);
      })
    );
  }
}
