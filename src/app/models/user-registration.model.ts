export interface UserRegistrationDto {
  id:number;
  username: string;
  email: string;
  password: string;
  roles: string[]; // Si los roles tienen valores específicos, puedes usar un tipo enumerado.
}
