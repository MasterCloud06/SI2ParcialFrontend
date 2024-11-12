// src/app/services/login/login.service.ts
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/models/user-profile.model'; // Asegúrate de tener esta ruta correcta
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/auth/login';
  private profileApiUrl = 'http://localhost:8080/api/users/{id}/profile'; // Endpoint para obtener el perfil

  private currentUserToken: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private currentUserRoles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUserProfile: BehaviorSubject<UserProfile | null> = new BehaviorSubject<UserProfile | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.initializeAuthState();
  }

  /**
   * Inicializa el estado de autenticación a partir de localStorage
   */
  private initializeAuthState(): void {
    const token = localStorage.getItem('authToken');
    const roles = localStorage.getItem('roles');
    const userProfile = localStorage.getItem('userProfile');

    if (token) {
      this.currentUserToken.next(token);
      this.currentUserLoginOn.next(true);
    }

    if (roles) {
      this.currentUserRoles.next(JSON.parse(roles));
    }

    if (userProfile) {
      this.currentUserProfile.next(JSON.parse(userProfile));
    }
  }

  /**
   * Inicia sesión con las credenciales proporcionadas
   * @param credentials Credenciales de inicio de sesión
   */
  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((response) => {
        const token = response.token;
        const roles = response.roles;

        if (token && roles) {
          // Guardar en localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('roles', JSON.stringify(roles));

          // Actualizar BehaviorSubjects
          this.currentUserToken.next(token);
          this.currentUserRoles.next(roles);
          this.currentUserLoginOn.next(true);

          // Obtener el perfil del usuario
          this.fetchUserProfile(token);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene el perfil del usuario autenticado
   * @param token Token de autenticación
   */
  private fetchUserProfile(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<UserProfile>(this.profileApiUrl, { headers }).pipe(
      tap((profile) => {
        if (profile) {
          localStorage.setItem('userProfile', JSON.stringify(profile));
          this.currentUserProfile.next(profile);
        }
      }),
      catchError((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        this.snackBar.open('Error al obtener el perfil del usuario.', 'Cerrar', { duration: 3000 });
        return throwError(() => new Error('Error al obtener el perfil del usuario.'));
      })
    ).subscribe();
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.currentUserLoginOn.value;
  }

  /**
   * Obtiene los roles del usuario
   */
  getUserRoles(): string[] {
    return this.currentUserRoles.value;
  }

  /**
   * Observable para los roles del usuario
   */
  getUserRolesObservable(): Observable<string[]> {
    return this.currentUserRoles.asObservable();
  }

  /**
   * Obtiene el perfil del usuario
   */
  getUserProfile(): UserProfile | null {
    return this.currentUserProfile.value;
  }

  /**
   * Observable para el perfil del usuario
   */
  getUserProfileObservable(): Observable<UserProfile | null> {
    return this.currentUserProfile.asObservable();
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('userProfile');

    this.currentUserToken.next(null);
    this.currentUserRoles.next([]);
    this.currentUserLoginOn.next(false);
    this.currentUserProfile.next(null);

    this.router.navigate(['/inicio']);
  }

  /**
   * Observable para el estado de login
   */
  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  /**
   * Obtiene el token de autenticación
   */
  getToken(): string | null {
    return this.currentUserToken.value;
  }

  /**
   * Maneja los errores de HTTP
   * @param error Error de respuesta HTTP
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error:', error.error);
    } else {
      console.error(`El backend devolvió un código de estado ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Algo falló; por favor, intente nuevamente.'));
  }
}
