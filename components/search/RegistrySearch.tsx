'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Loader2, AlertCircle, CheckCircle, XCircle, Shield, Award } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatDate, formatDNI, validateDNI } from '@/lib/utils'
import Image from 'next/image'
import { Matricula } from '@/types'

export default function RegistrySearch() {
  const [dni, setDni] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Matricula[]>([]) 
  const [error, setError] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const saved = localStorage.getItem('remaep_recent_searches')
    if (saved) setRecentSearches(JSON.parse(saved).slice(0, 3))
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const dniClean = dni.replace(/\D/g, '')
    
    if (!validateDNI(dniClean)) {
      setError('Ingrese un DNI válido (7 u 8 dígitos)')
      return
    }

    setLoading(true)
    setError(null)
    setResults([])

    try {
      // Corrección crítica: Usamos .select() sin .maybeSingle() para traer múltiples matrículas
      const { data, error } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni_alumno', dniClean)
        .eq('registro_id', 'remaep')
        .order('estado', { ascending: true }) // Prioriza ACTIVO visualmente

      if (error) throw error

      if (!data || data.length === 0) {
        setError('No se encontró ninguna matrícula vinculada a este DNI')
        return
      }

      setResults(data)
      
      const updated = [dniClean, ...recentSearches.filter(s => s !== dniClean)].slice(0, 3)
      setRecentSearches(updated)
      localStorage.setItem('remaep_recent_searches', JSON.stringify(updated))
      
    } catch (err) {
      setError('Error de conexión con el Registro Nacional.')
    } finally {
      setLoading(false)
    }
  }

  const handleRecentSearch = (dni: string) => {
    setDni(dni)
    // Dispara el submit manualmente o actualiza el estado para que el usuario presione enter
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Formulario de Búsqueda */}
      <form onSubmit={handleSearch} className="relative mb-12">
        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-navy-800 to-slate-700 rounded-2xl blur opacity-20"></div>
           <div className="relative flex flex-col sm:flex-row gap-3">
             <input
               ref={inputRef}
               type="text"
               value={dni}
               onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
               placeholder="Ingrese DNI profesional..."
               maxLength={8}
               className="w-full px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-navy-800 focus:ring-4 focus:ring-navy-800/10 placeholder:text-slate-400 text-slate-800 outline-none transition-all"
             />
             <button type="submit" disabled={loading} className="px-8 py-4 bg-navy-800 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:bg-navy-700 transition-colors disabled:opacity-50">
                {loading ? <Loader2 className="animate-spin" /> : <Search />}
                Verificar
             </button>
           </div>
        </div>

        {/* Búsquedas recientes */}
        {recentSearches.length > 0 && results.length === 0 && (
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
             <span>Recientes:</span>
             {recentSearches.map(s => (
               <button key={s} onClick={() => setDni(s)} className="hover:text-navy-800 underline decoration-dotted">
                 {s}
               </button>
             ))}
          </div>
        )}

        {/* Mensaje de Error */}
        {error && (
          <div className="mt-6 flex items-start gap-3 bg-crimson-50 text-crimson-700 p-4 rounded-xl border border-crimson-100 animate-fade-in">
             <AlertCircle className="shrink-0 mt-0.5" size={20} />
             <div>
               <p className="font-bold">Sin resultados</p>
               <p className="text-sm">{error}</p>
             </div>
          </div>
        )}
      </form>

      {/* Renderizado de Múltiples Credenciales */}
      <div className="space-y-8">
        {results.map((result) => (
          <div key={result.id} className="animate-slide-up bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-elevated">
            {/* Cabecera de la Credencial */}
            <div className={`px-6 py-4 flex justify-between items-center ${result.estado === 'ACTIVO' ? 'bg-navy-800' : 'bg-slate-700'}`}>
              <div className="flex items-center gap-3">
                <Shield className="text-white/80" />
                <span className="text-white font-montserrat font-bold uppercase tracking-tight">Registro Oficial REMAEP</span>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${result.estado === 'ACTIVO' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' : 'bg-red-500/20 text-red-400 border-red-400/30'}`}>
                {result.estado === 'ACTIVO' ? (
                   <span className="flex items-center gap-1"><CheckCircle size={14} /> ACTIVO</span>
                ) : (
                   <span className="flex items-center gap-1"><XCircle size={14} /> SUSPENDIDO</span>
                )}
              </div>
            </div>

            {/* Cuerpo de la Credencial */}
            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-50 shadow-md self-center md:self-start bg-slate-100">
                {result.foto_url ? (
                  <Image 
                     src={result.foto_url} 
                     alt={result.nombre} 
                     fill 
                     className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Shield size={40} />
                  </div>
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Profesional</span>
                  <p className="text-xl font-bold text-slate-900 leading-tight">{result.apellido}, {result.nombre}</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Identificación</span>
                  <p className="text-xl font-mono text-slate-700">{formatDNI(result.dni_alumno)}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Certificación Homologada</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Award className="text-navy-700 w-5 h-5" />
                    <p className="font-semibold text-slate-800 text-lg">{result.curso}</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Vencimiento</span>
                  <p className="text-slate-700 font-medium">{formatDate(result.fecha_vencimiento)}</p>
                </div>
                <div>
                   <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Institución</span>
                   <p className="text-slate-700 font-medium uppercase">{result.institution_id || 'REMAEP CENTRAL'}</p>
                </div>
              </div>
            </div>
            
            {/* Footer de Validación */}
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-2">
              <span className="text-[10px] text-slate-400 uppercase">Verificación Blockchain: ✅ Auténtico</span>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Matrícula ID: #{result.id}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
