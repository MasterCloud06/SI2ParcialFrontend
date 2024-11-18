export interface Horario {
  id: number;
  dia: string;
  turno: string;
  modoConsulta: string;
  horaInicio: string;
  horaFin: string;
  medico: {
    idMedico: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    especialidades: Array<{
      idEspecialidad: number;
      nombre: string;
      descripcion: string;
    }>;
  };
}
