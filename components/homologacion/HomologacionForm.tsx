'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, Hash } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { validateDNI, validateEmail, sanitizeString } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function HomologacionForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    dni: '',
    apellido: '',
    nombre: '',
    email: '',
    telefono: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type === 'application/pdf') {
      if (file.size > 10 * 1024 * 1024) { // 10MB
        setError('El archivo no puede superar los 10MB')
        return
      }
      setFile(file)
      setError(null)
    } else {
      setError('Solo se aceptan archivos PDF')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
  })

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    if (!validateDNI(formData.dni)) errors.dni = 'DNI inválido (7 u 8 dígitos)'
    if (!formData.apellido.trim()) errors.apellido = 'El apellido es obligatorio'
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es obligatorio'
    if (!validateEmail(formData.email)) errors.email = 'Email inválido'
    if (!file) errors.file = 'Debe adjuntar su título en formato PDF'

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setUploading(true)
    setError(null)

    try {
      // 1. Upload PDF to Supabase Storage
      const fileName = `${Date.now()}_${formData.dni}.pdf`
      const { error: uploadError } = await supabase.storage
        .from('titulos')
        .upload(`homologaciones/${fileName}`, file!, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('titulos')
        .getPublicUrl(`homologaciones/${fileName}`)

      // 3. Save homologation request using our API Route (safer) or direct Supabase if policy allows
      // Usaremos inserción directa a Supabase ya que configuramos la RLS para permitir INSERT público
      const { data, error: insertError } = await supabase
        .from('homologaciones')
        .insert([
          {
            dni: formData.dni,
            apellido: sanitizeString(formData.apellido),
            nombre: sanitizeString(formData.nombre),
            email: formData.email.toLowerCase(),
            telefono: formData.telefono.replace(/\D/g, ''),
            titulo_url: publicUrl,
            estado: 'PENDIENTE',
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      // 4. Redirect
      router.push(`/homologacion/success?id=${data.id}`)

    } catch (err) {
      console.error('Error:', err)
      setError('Error al procesar la solicitud. Intente nuevamente.')
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'dni' || name === 'telefono') {
      setFormData(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    // Clear error
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const n = { ...prev }; delete n[name]; return n
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-elevated">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-800 to-navy-900 px-8 py-6">
          <h2 className="text-white font-montserrat font-semibold text-xl">Solicitud de Homologación</h2>
          <p className="text-white/70 text-sm mt-1">Complete el formulario para iniciar el proceso de matriculación</p>
        </div>

        {/* Form Fields */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Hash size={14}/> DNI</label>
               <input type="text" name="dni" value={formData.dni} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-800 outline-none" placeholder="12345678" maxLength={8} />
               {fieldErrors.dni && <p className="text-xs text-crimson-600">{fieldErrors.dni}</p>}
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Phone size={14}/> Teléfono</label>
               <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-800 outline-none" placeholder="11..." />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><User size={14}/> Apellido</label>
               <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-800 outline-none" />
               {fieldErrors.apellido && <p className="text-xs text-crimson-600">{fieldErrors.apellido}</p>}
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><User size={14}/> Nombre</label>
               <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-800 outline-none" />
               {fieldErrors.nombre && <p className="text-xs text-crimson-600">{fieldErrors.nombre}</p>}
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><Mail size={14}/> Email</label>
             <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-navy-800 outline-none" />
             {fieldErrors.email && <p className="text-xs text-crimson-600">{fieldErrors.email}</p>}
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2"><FileText size={14}/> Título (PDF)</label>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-navy-800 bg-navy-50' : 'border-slate-200 hover:border-navy-800'} ${fieldErrors.file ? 'border-crimson-500 bg-crimson-50' : ''}`}>
               <input {...getInputProps()} />
               {file ? (
                 <div className="flex flex-col items-center gap-2">
                   <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600"><FileText /></div>
                   <p className="font-medium text-slate-800">{file.name}</p>
                   <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                   <button type="button" onClick={(e) => {e.stopPropagation(); setFile(null)}} className="text-xs text-crimson-600 hover:underline">Eliminar</button>
                 </div>
               ) : (
                 <div className="flex flex-col items-center gap-2 text-slate-400">
                   <Upload size={32} />
                   <p className="text-sm font-medium text-slate-700">Arrastre su título aquí</p>
                   <p className="text-xs">Solo PDF (Máx 10MB)</p>
                 </div>
               )}
            </div>
            {fieldErrors.file && <p className="text-xs text-crimson-600">{fieldErrors.file}</p>}
          </div>

          {error && (
            <div className="bg-crimson-50 text-crimson-700 p-4 rounded-xl text-sm flex items-center gap-2 border border-crimson-100">
              <AlertCircle size={16}/> {error}
            </div>
          )}

          <button type="submit" disabled={uploading} className="w-full py-4 bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-all font-medium shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
             {uploading ? <><Loader2 className="animate-spin" /> Enviando...</> : <><CheckCircle /> Iniciar Trámite</>}
          </button>
        </div>
      </div>
    </form>
  )
}
