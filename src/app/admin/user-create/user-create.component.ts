import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Opcional
import { BitacoraService } from '../../services/bitacora/bitacora.service'; // Importa el servicio de bitácora

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  availableRoles: string[] = ['ADMIN', 'USUARIO', 'MEDICO', 'PACIENTE'];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar, // Opcional
    private bitacoraService: BitacoraService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: [[], [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.userService.registerUser(newUser).subscribe(
        () => {
          this.snackBar.open('Usuario creado correctamente', 'Cerrar', { duration: 3000 });

          // Registra la acción en la bitácora después de la creación exitosa
          this.bitacoraService.registrarAccion(`Usuario creado: ${newUser.username}`);

          this.router.navigate(['/admin/users']);
        },
        (error) => {
          console.error('Error al crear usuario', error);
          this.snackBar.open('Error al crear usuario', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/users']);
  }
}
