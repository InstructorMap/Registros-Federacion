export interface Matricula {
  id: number;
  dni_alumno: string;
  apellido: string;
  nombre: string;
  email?: string;
  curso: string;
  fecha_inicio: string;
  fecha_vencimiento: string;
  estado: 'ACTIVO' | 'SUSPENDIDO' | 'VENCIDO';
  foto_url: string;
  registro_id: string;
  institution_id: string;
  premium: boolean;
  created_at?: string;
}

export interface HomologacionFormData {
  dni: string;
  apellido: string;
  nombre: string;
  email: string;
  telefono: string;
  titulo: File | null;
}
