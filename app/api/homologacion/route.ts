import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { validateDNI, validateEmail } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { dni, apellido, nombre, email, telefono, titulo_url } = body

    // Validaciones de Servidor
    if (!validateDNI(dni)) {
      return NextResponse.json({ error: 'DNI inválido' }, { status: 400 })
    }

    if (!apellido?.trim() || !nombre?.trim()) {
      return NextResponse.json({ error: 'Nombre y apellido son requeridos' }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    if (!titulo_url) {
      return NextResponse.json({ error: 'El título es requerido' }, { status: 400 })
    }

    // Verificar duplicados en proceso
    const { data: existing } = await supabase
      .from('homologaciones')
      .select('id, estado')
      .eq('dni', dni)
      .in('estado', ['PENDIENTE', 'EN_REVISION'])
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe una solicitud en proceso para este DNI' },
        { status: 409 }
      )
    }

    // Insertar solicitud
    const { data, error } = await supabase
      .from('homologaciones')
      .insert([
        {
          dni,
          apellido: apellido.trim(),
          nombre: nombre.trim(),
          email: email.toLowerCase(),
          telefono: telefono?.replace(/\D/g, ''),
          titulo_url,
          estado: 'PENDIENTE',
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: 'Solicitud creada exitosamente',
      id: data.id,
    })

  } catch (error) {
    console.error('Error en homologación:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dniRaw = searchParams.get('dni')
  const email = searchParams.get('email')
  
  // Limpieza del DNI para la búsqueda
  const dni = dniRaw ? dniRaw.replace(/\D/g, '') : null

  try {
    let query = supabase
      .from('homologaciones')
      .select('id, estado, created_at')
      .order('created_at', { ascending: false })

    if (dni) {
      query = query.eq('dni', dni)
    }

    if (email) {
      query = query.eq('email', email.toLowerCase())
    }

    // Si no hay filtros, no devolvemos nada por seguridad (o limitamos mucho)
    if (!dni && !email) {
         return NextResponse.json({ error: 'Faltan parámetros de búsqueda' }, { status: 400 })
    }

    const { data, error } = await query.limit(1).maybeSingle()

    if (error) throw error

    return NextResponse.json({ data })

  } catch (error) {
    return NextResponse.json(
      { error: 'Error al consultar solicitud' },
      { status: 500 }
    )
  }
}
