import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationDto } from '../../models/user-registration.model';
import { UserUpdateDto } from '../../models/user-update.model';
import { RoleAssignmentDto } from '../../models/role-assignment.model';
import { environment } from '../../../environments/environment.prod'; // Asegúrate de que esta ruta sea correcta

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Array<{ id: number; name: string }>;
  especialidadId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  // Obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Registrar un nuevo usuario
  registerUser(user: UserRegistrationDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  // Actualizar un usuario
  updateUser(id: number, user: UserUpdateDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Asignar un rol a un usuario
  assignRole(userId: number, roleDto: RoleAssignmentDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/assign-role`, roleDto);
  }

  // Obtener médicos por especialidad
  getMedicosByEspecialidad(especialidadId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/medicos/especialidad/${especialidadId}`);
  }
}
