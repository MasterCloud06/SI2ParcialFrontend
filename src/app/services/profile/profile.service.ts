// src/app/services/profile/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserProfile } from '../../models/user-profile.model';
import { environment } from '../../../environments/environment.prod'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  // Obtener el perfil del usuario
  getUserProfile(userId: number): Observable<UserProfile> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError(() => new Error('No se encontró el token'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = `${environment.apiUrl}/users/${userId}/profile`;

    return this.http.get<UserProfile>(apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        return throwError(() => error);
      })
    );
  }

  // Actualizar el perfil del usuario
  updateUserProfile(userId: number, profile: UserProfile): Observable<UserProfile> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return throwError(() => new Error('No se encontró el token'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = `${environment.apiUrl}/users/${userId}/profile`;

    return this.http.put<UserProfile>(apiUrl, profile, { headers }).pipe(
      catchError((error) => {
        console.error('Error al actualizar el perfil del usuario:', error);
        return throwError(() => error);
      })
    );
  }
}
