// src/app/pages/profile/profile.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserProfile } from 'src/app/models/user-profile.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: UserProfile | null = null;
  isEditMode: boolean = false;
  isLoggedIn: boolean = false;
  userRoles: string[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token'); // Verificar si el usuario está logueado por la presencia del token
    if (this.isLoggedIn) {
      this.fetchUserProfile();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Obtiene el perfil del usuario desde el backend.
   */
  private fetchUserProfile(): void {
    this.profileService.getUserProfile()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (profile) => {
          this.userProfile = profile;
        },
        error: (err) => {
          console.error('Error al cargar el perfil:', err);
          this.snackBar.open('Hubo un error al cargar el perfil del usuario.', 'Cerrar', { duration: 3000 });
        },
      });
  }

  /**
   * Alterna el modo de edición si el usuario tiene permiso
   */
  toggleEditMode(): void {
    if (this.canEditProfile()) {
      this.isEditMode = !this.isEditMode;
    } else {
      this.snackBar.open('No tienes permiso para editar tu perfil.', 'Cerrar', { duration: 3000 });
    }
  }

  /**
   * Guarda los cambios realizados en el perfil
   */
  saveChanges(): void {
    if (this.canEditProfile() && this.userProfile) {
      this.profileService.updateUserProfile(this.userProfile)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (updatedProfile) => {
            this.userProfile = updatedProfile;
            this.isEditMode = false;
            this.snackBar.open('Cambios guardados exitosamente.', 'Cerrar', { duration: 3000 });
          },
          error: (err) => {
            console.error('Error al guardar cambios:', err);
            this.snackBar.open('Hubo un error al guardar los cambios. Inténtalo de nuevo.', 'Cerrar', { duration: 3000 });
          },
        });
    } else {
      this.snackBar.open('No tienes permiso para guardar cambios en tu perfil.', 'Cerrar', { duration: 3000 });
    }
  }

  /**
   * Cancela la edición del perfil
   */
  cancelEdit(): void {
    this.isEditMode = false;
    if (this.isLoggedIn) {
      this.fetchUserProfile(); // Recargar los datos para descartar los cambios no guardados
    }
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param role Rol a verificar
   */
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  /**
   * Verifica si el usuario puede editar el perfil
   */
  canEditProfile(): boolean {
    return this.hasRole('ADMIN') || this.hasRole('PACIENTE') || this.hasRole('MEDICO');
  }
}
