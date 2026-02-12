'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Shield, Lock, Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/admin')
      router.refresh()
      
    } catch (err: any) {
      setError('Credenciales inválidas o error de conexión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-navy-800 p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-montserrat font-bold text-white">Acceso Administrativo</h1>
          <p className="text-blue-200 text-sm mt-1">Portal de Gestión REMAEP</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Corporativo</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-800 focus:border-transparent outline-none transition-all"
                  placeholder="admin@remaep.com"
                  required
                />
                <Shield className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Contraseña</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy-800 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-navy-800 text-white py-3 rounded-xl font-bold hover:bg-navy-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Ingresar al Sistema'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
