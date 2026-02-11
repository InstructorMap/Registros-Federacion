'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Users, FileText, AlertCircle, CheckCircle, 
  Clock, Search, ExternalLink, Filter, LayoutDashboard 
} from 'lucide-react'
import { formatDNI } from '@/lib/utils'

export default function AdminDashboard() {
  const [homologaciones, setHomologaciones] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, activas: 0, pendientes: 0 })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    // 1. Obtener Estadísticas de la Vista
    const { data: statsData } = await supabase.from('v_estadisticas').select('*').single()
    const { count: pendingCount } = await supabase
      .from('homologaciones')
      .select('*', { count: 'exact', head: true })
      .eq('estado', 'PENDIENTE')

    if (statsData) {
      setStats({
        total: statsData.total_matriculas,
        activas: statsData.activas,
        pendientes: pendingCount || 0
      })
    }

    // 2. Obtener Solicitudes de Homologación
    const { data } = await supabase
      .from('homologaciones')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setHomologaciones(data)
    setLoading(false)
  }

  const updateEstado = async (id: number, nuevoEstado: string) => {
    const { error } = await supabase
      .from('homologaciones')
      .update({ estado: nuevoEstado, fecha_resolucion: new Date().toISOString() })
      .eq('id', id)

    if (!error) fetchData() // Recargar datos
  }

  const filtered = homologaciones.filter(h => 
    h.dni.includes(filter) || h.apellido.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Fijo */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-montserrat font-bold tracking-tight text-lg">REMAEP ADMIN</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 bg-blue-600 px-4 py-3 rounded-xl text-sm font-medium transition-all">
            <Users size={18} /> <span>Homologaciones</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-slate-400 hover:text-white px-4 py-3 rounded-xl text-sm font-medium transition-all">
            <FileText size={18} /> <span>Matriculados</span>
          </button>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-montserrat font-bold text-slate-900">Panel de Gestión</h1>
          <p className="text-slate-500">Auditoría y control de registros nacionales</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Matriculados" value={stats.total} icon={<Users className="text-blue-600" />} color="bg-blue-50" />
          <StatCard title="Solicitudes Pendientes" value={stats.pendientes} icon={<Clock className="text-amber-600" />} color="bg-amber-50" />
          <StatCard title="Matrículas Activas" value={stats.activas} icon={<CheckCircle className="text-emerald-600" />} color="bg-emerald-50" />
        </div>

        {/* Tabla de Homologaciones */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-slate-800 font-montserrat">Solicitudes de Homologación</h3>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar por DNI o Apellido..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  <th className="px-6 py-4">Profesional</th>
                  <th className="px-6 py-4">DNI</th>
                  <th className="px-6 py-4">Documentación</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{h.apellido}, {h.nombre}</p>
                      <p className="text-xs text-slate-500">{h.email}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-slate-600">{formatDNI(h.dni)}</td>
                    <td className="px-6 py-4">
                      <a 
                        href={h.titulo_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        <ExternalLink size={14} /> <span>Ver Título PDF</span>
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={h.estado} />
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        value={h.estado}
                        onChange={(e) => updateEstado(h.id, e.target.value)}
                      >
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="EN_REVISION">En Revisión</option>
                        <option value="APROBADO">Aprobar</option>
                        <option value="RECHAZADO">Rechazar</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

// Componentes Auxiliares
function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <p className="text-3xl font-montserrat font-bold text-slate-900">{value}</p>
      </div>
      <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    PENDIENTE: "bg-amber-100 text-amber-700 border-amber-200",
    EN_REVISION: "bg-blue-100 text-blue-700 border-blue-200",
    APROBADO: "bg-emerald-100 text-emerald-700 border-emerald-200",
    RECHAZADO: "bg-red-100 text-red-700 border-red-200",
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      {status.replace('_', ' ')}
    </span>
  )
}
