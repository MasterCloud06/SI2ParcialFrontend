export interface FichaAtencion {
  id: number;
  pacienteNombre: string;
  medicoNombre: string;
  especialidadNombre: string;
  fecha: string; // Fecha en formato string (YYYY-MM-DD)
  hora: string; // Hora en formato string (HH:mm:ss)
  estado: string;
}
