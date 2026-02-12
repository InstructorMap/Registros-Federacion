import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  db: {
    schema: 'public',
  },
})

// ⚠️ ESTO ES LO QUE TE FALTA - EL TIPO EXPORTADO ⚠️
export type Matricula = {
  id?: number
  dni_alumno: string
  apellido: string
  nombre: string
  curso: string
  estado: 'ACTIVO' | 'SUSPENDIDO'
  fecha_vencimiento: string
  foto_url: string | null
  registro_id: 'remaep'
  created_at?: string
  updated_at?: string
}

export type Homologacion = {
  id?: number
  dni: string
  apellido: string
  nombre: string
  email: string
  telefono?: string
  titulo_url: string
  estado: 'PENDIENTE' | 'EN_REVISION' | 'APROBADO' | 'RECHAZADO'
  created_at?: string
}
