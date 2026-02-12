'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, Clock, CheckCircle, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react'
import { formatDNI, formatDate } from '@/lib/utils'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, activas: 0, pendientes: 0 })
  const [pendientes, setPendientes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // 1. Obtener Stats (Usando la vista v_estadisticas que creamos en SQL)
      const { data: statsData } = await supabase.from('v_estadisticas').select('*').single()
      
      if (statsData) {
        setStats({
          total: statsData.total_matriculas,
          activas: statsData.activas,
          pendientes: statsData.pendientes_revision
        })
      }

      // 2. Obtener últimas 5 homologaciones pendientes
      const { data: latest } = await supabase
        .from('homologaciones')
        .select('*')
        .eq('estado', 'PENDIENTE')
        .order('created_at', { ascending: false })
        .limit(5)

      if (latest) setPendientes(latest)

    } catch (error) {
      console.error('Error cargando dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-montserrat font-bold text-navy-900">Dashboard General</h2>
        <p className="text-slate-500">Resumen de actividad del registro en tiempo real.</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Matriculados" 
          value={stats.total} 
          icon={<Users className="text-white" />} 
          bg="bg-gradient-to-br from-blue-500 to-blue-600" 
        />
        <StatCard 
          title="Solicitudes Pendientes" 
          value={stats.pendientes} 
          icon={<Clock className="text-white" />} 
          bg="bg-gradient-to-br from-amber-500 to-amber-600" 
        />
        <StatCard 
          title="Credenciales Activas" 
          value={stats.activas} 
          icon={<CheckCircle className="text-white" />} 
          bg="bg-gradient-to-br from-emerald-500 to-emerald-600" 
        />
      </div>

      {/* Sección de Pendientes */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-navy-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-500" />
            Requieren Atención Inmediata
          </h3>
          <button className="text-xs font-bold text-blue-600 hover:underline uppercase">Ver todas</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Solicitante</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4 text-center">Título</th>
                <th className="px-6 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendientes.length > 0 ? pendientes.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{p.apellido}, {p.nombre}</p>
                    <p className="text-xs text-slate-500 font-mono">DNI: {formatDNI(p.dni)}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {formatDate(p.created_at)}
                  </td>
                  <td className="px-6 py-4 text-center">
                     <a href={p.titulo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <ExternalLink size={12} /> Ver PDF
                     </a>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-lg hover:bg-navy-800 transition-all shadow-sm">
                      Revisar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No hay solicitudes pendientes. ¡Buen trabajo!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, bg }: any) {
  return (
    <div className={`p-6 rounded-2xl shadow-lg text-white ${bg} relative overflow-hidden group`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 group-hover:scale-125 transition-transform duration-500">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
          {icon}
        </div>
        <p className="text-3xl font-montserrat font-bold">{value}</p>
        <p className="text-xs font-medium uppercase tracking-wider opacity-80 mt-1">{title}</p>
      </div>
    </div>
  )
}
