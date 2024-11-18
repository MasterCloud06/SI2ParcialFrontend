import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; // Opcional
import { BitacoraService } from '../../services/bitacora/bitacora.service'; // Importa el servicio de bitácora


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  user!: User;
  availableRoles: string[] = ['ADMIN', 'USUARIO', 'MEDICO', 'PACIENTE'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar, // Opcional
    private bitacoraService: BitacoraService
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.user = data;
        this.initializeForm();
      },
      (error) => {
        console.error('Error al obtener usuario', error);
        this.snackBar.open('Error al cargar usuario', 'Cerrar', { duration: 3000 });
      }
    );
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      roles: [this.user.roles, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.userId,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        roles: this.userForm.value.roles,
        nombre: this.userForm.value.nombre,
        apellido: this.userForm.value.apellido
      };

      this.userService.updateUser(this.userId, updatedUser).subscribe(
        () => {
          this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.bitacoraService.registrarAccion(`Usuario creado: ${updatedUser.username}`);

          this.router.navigate(['/admin/users']);
        },
        (error) => {
          console.error('Error al actualizar usuario', error);
          this.snackBar.open('Error al actualizar usuario', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/users']);
  }
}
