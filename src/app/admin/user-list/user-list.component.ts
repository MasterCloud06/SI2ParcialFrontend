import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Opcional para notificaciones
import { BitacoraService } from '../../services/bitacora/bitacora.service'; // Importa el servicio de bitácora

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'roles', 'actions'];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar, // Opcional
    private bitacoraService: BitacoraService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.map(user => ({
          ...user,
          rolesString: user.roles.map(role => role.name).join(', ') // Extrae el nombre de cada rol
        }));
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
      }
    );
  }

  editUser(id: number): void {
    this.router.navigate([`/admin/users/edit/${id}`]);
  }

  deleteUser(id: number): void {
    const userToDelete = this.users.find(user => user.id === id); // Encuentra el usuario a eliminar

    if (userToDelete && confirm(`¿Estás seguro de eliminar al usuario ${userToDelete.username}?`)) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });

          // Registra la acción en la bitácora después de la eliminación exitosa
          this.bitacoraService.registrarAccion(`Usuario eliminado: ${userToDelete.username}`);

          this.loadUsers(); // Recarga la lista de usuarios después de la eliminación
        },
        (error) => {
          console.error('Error al eliminar usuario', error);
          this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
