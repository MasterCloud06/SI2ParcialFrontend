export interface User {
  id: number;
  username: string;
  email: string;
  roles: Array<{ id: number; name: string }>;
  especialidadId?: number;
  nombre: string;
  apellido: string;
  idMedico?: number; // Añade este campo
}
