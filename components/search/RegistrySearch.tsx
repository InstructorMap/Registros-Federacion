'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, User, History, Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { supabase, Matricula } from '@/lib/supabase'
import CredencialDigital from './CredencialDigital'

export default function RegistrySearch() {
  const [dni, setDni] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Matricula | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const saved = localStorage.getItem('remaep_recent_searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 3))
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const dniClean = dni.replace(/\D/g, '')
    
    if (!dniClean || dniClean.length < 7) {
      setError('Ingresá un DNI válido (7 u 8 dígitos)')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { data, error } = await supabase
        .from('matriculas')
        .select('*')
        .eq('dni_alumno', dniClean)
        .eq('registro_id', 'remaep')
        .maybeSingle()

      if (error) throw error

      if (!data) {
        setError('No encontramos una matrícula activa con este DNI')
        return
      }

      setResult(data)
      
      const updated = [dniClean, ...recentSearches.filter(s => s !== dniClean)].slice(0, 3)
      setRecentSearches(updated)
      localStorage.setItem('remaep_recent_searches', JSON.stringify(updated))
      
    } catch (err) {
      console.error('Error:', err)
      setError('Error al consultar el registro. Intentalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Buscador rediseñado con más vida */}
      <div className="relative">
        <div className={`
          absolute -inset-1 bg-gradient-to-r from-navy-800/30 via-slate-500/30 to-navy-800/30 
          rounded-3xl blur-2xl transition-opacity duration-500
          ${isFocused ? 'opacity-100' : 'opacity-0'}
        `} />
        
        <div className="relative">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="00.000.000"
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur-sm 
                           border-2 rounded-2xl transition-all duration-300
                           placeholder:text-slate-400 text-slate-800 font-mono
                           focus:border-navy-800 focus:ring-4 focus:ring-navy-800/20
                           hover:border-slate-300"
                  style={{
                    borderColor: isFocused ? '#0d47a1' : '#e2e8f0',
                  }}
                  maxLength={8}
                  inputMode="numeric"
                  autoComplete="off"
                />
                
                {!dni && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading || !dni || dni.length < 7}
                className="px-8 py-4 bg-gradient-to-r from-navy-800 to-navy-900 
                         text-white rounded-2xl font-medium
                         hover:from-navy-900 hover:to-navy-800 
                         transition-all duration-300 transform hover:scale-[1.02]
                         shadow-lg shadow-navy-800/30 flex items-center justify-center gap-2
                         group disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <span>Verificar</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Búsquedas recientes */}
          {recentSearches.length > 0 && !result && !error && (
            <div className="mt-4 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-500">Buscaste:</span>
              <div className="flex gap-2">
                {recentSearches.map((dni) => (
                  <button
                    key={dni}
                    onClick={() => {
                      setDni(dni)
                      setTimeout(() => handleSearch(new Event('submit') as any), 10)
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 
                             text-slate-700 rounded-lg transition-colors text-sm font-mono"
                  >
                    {dni.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ayuda contextual */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              Sin puntos
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              7 u 8 dígitos
            </span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Resultado inmediato
            </span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 text-crimson-600 bg-crimson-50 
                       border border-crimson-200 rounded-xl px-5 py-4 animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">{error}</p>
            <p className="text-xs text-crimson-500 mt-1">
              ¿Necesitás ayuda? Comunicate con mesa de ayuda
            </p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="animate-pulse">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-navy-800/50 via-slate-600/50 to-navy-800/50" />
            <div className="p-8">
              <div className="flex gap-6">
                <div className="w-20 h-20 bg-slate-200 rounded-2xl"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resultado con la NUEVA credencial */}
      {result && <CredencialDigital matricula={result} />}
    </div>
  )
}
