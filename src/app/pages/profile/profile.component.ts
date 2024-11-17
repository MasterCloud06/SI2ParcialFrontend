// src/app/pages/profile/profile.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserProfile } from 'src/app/models/user-profile.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: UserProfile | null = null;
  isEditMode: boolean = false;
  isLoggedIn: boolean = false;
  userRoles: string[] = []; // Guarda el nombre del rol del usuario actual

  private unsubscribe$ = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('authToken');
    const storedProfile = localStorage.getItem('userProfile');

    if (this.isLoggedIn && storedProfile) {
      const userId = Number(JSON.parse(storedProfile).id);
      if (userId) {
        this.fetchUserProfile(userId);
      } else {
        console.error("No se encontró el userId en el perfil almacenado.");
      }
    } else {
      console.error("No hay token o perfil de usuario almacenado.");
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Obtiene el perfil del usuario desde el backend.
   * @param userId ID del usuario a obtener el perfil
   */
  private fetchUserProfile(userId: number): void {
    this.profileService.getUserProfile(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (profile) => {
          this.userProfile
          = profile;
          console.log("Perfil cargado:", this.userProfile);

          // Extraer el nombre del primer rol y asignarlo a `userRoles`
          if (this.userProfile.roles && this.userProfile.roles.length > 0) {
            this.userRoles = [this.userProfile.roles[0].name]; // Solo toma el primer rol
          }

          // Forzar la detección de cambios para actualizar la vista
          this.cdr.detectChanges();
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
      const userId = Number(this.userProfile.id);
      this.profileService.updateUserProfile(userId, this.userProfile)
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
      const storedProfile = localStorage.getItem('userProfile');
      if (storedProfile) {
        const userId = Number(JSON.parse(storedProfile).id);
        this.fetchUserProfile(userId);
      }
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
