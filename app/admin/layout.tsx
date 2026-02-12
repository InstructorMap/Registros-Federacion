'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { LayoutDashboard, Users, FileText, LogOut, Shield, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay usuario logueado
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login') // Si no hay sesión, fuera
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><span className="animate-pulse">Cargando sistema...</span></div>

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR (Barra Lateral Oscura) */}
      <aside className="w-64 bg-navy-900 text-white flex-shrink-0 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-navy-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white">
             <Shield size={20} fill="currentColor" />
          </div>
          <div>
            <h1 className="font-montserrat font-bold text-lg tracking-tight">REMAEP</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Admin Console</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" active={pathname === '/admin'} />
          <NavItem href="/admin/matriculas" icon={<Users size={18} />} label="Matrículas" active={pathname.includes('matriculas')} />
          <NavItem href="/admin/homologaciones" icon={<FileText size={18} />} label="Homologaciones" active={pathname.includes('homologaciones')} />
          <div className="pt-4 mt-4 border-t border-navy-800">
             <NavItem href="/admin/config" icon={<Settings size={18} />} label="Configuración" active={pathname.includes('config')} />
          </div>
        </nav>

        <div className="p-4 border-t border-navy-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
          >
            <LogOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL (A la derecha del sidebar) */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto min-h-screen">
        {children}
      </main>
    </div>
  )
}

function NavItem({ href, icon, label, active }: any) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:text-white hover:bg-navy-800'
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
