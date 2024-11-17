// src/app/models/user-profile.model.ts
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  uniqueId: string;
  status: string;
  coursesEnroll: number;
  roles: Array<{ id: number; name: string }>; // Ajustado para reflejar un array de roles
  imageUrl?: string; // URL de la imagen de perfil (opcional)
}
