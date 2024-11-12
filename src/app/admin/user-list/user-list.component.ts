import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Opcional para notificaciones

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
    private snackBar: MatSnackBar // Opcional
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
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
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', { duration: 3000 });
          this.loadUsers();
        },
        (error) => {
          console.error('Error al eliminar usuario', error);
          this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
        }
      );
    }
  }
}
