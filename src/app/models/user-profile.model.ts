// src/app/models/user-profile.model.ts
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  uniqueId: string;
  status: string;
  coursesEnroll: number;
  role: string; // ROLE_USUARIO, ROLE_ADMIN, ROLE_PACIENTE, ROLE_MEDICO
  imageUrl?: string; // URL de la imagen de perfil (opcional)
  // Agrega otros campos según tu modelo de datos
}
