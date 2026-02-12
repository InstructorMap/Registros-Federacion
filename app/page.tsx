import RegistrySearch from '@/components/search/RegistrySearch'
import { Shield, CheckCircle, Lock, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* SECCIÓN HERO (El encabezado azul impactante) */}
      <section className="relative bg-navy-900 text-white pt-20 pb-32 overflow-hidden">
        {/* Fondo decorativo (gradiente) */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8 animate-fade-in">
            <Shield size={16} className="text-emerald-400" />
            <span className="text-xs font-bold tracking-wider uppercase">Base de Datos Nacional Oficial</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 leading-tight animate-fade-in">
            Validación Profesional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-100">
              Segura y Transparente
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-lg mb-10 leading-relaxed animate-fade-in">
            La plataforma centralizada para la verificación de matrículas y certificaciones de auxiliares de la salud y emergencias prehospitalarias.
          </p>
        </div>
      </section>

      {/* SECCIÓN DEL BUSCADOR (Elevado sobre el azul) */}
      <section className="relative -mt-24 px-4 z-20 mb-20">
        <div className="max-w-4xl mx-auto drop-shadow-2xl">
           <RegistrySearch />
        </div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS (Para que no quede vacío abajo) */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Lock className="text-navy-600" />}
          title="Seguridad Blockchain" 
          desc="Cada credencial emitida cuenta con trazabilidad digital inalterable." 
        />
        <FeatureCard 
          icon={<Award className="text-navy-600" />}
          title="Respaldo Institucional" 
          desc="Avalado por la Federación y organismos nacionales competentes." 
        />
        <FeatureCard 
          icon={<CheckCircle className="text-navy-600" />}
          title="Datos en Tiempo Real" 
          desc="Sincronización inmediata de estados de habilitación y bajas." 
        />
      </section>
    </div>
  )
}

function FeatureCard({title, desc, icon}: any) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-navy-900 mb-3 font-montserrat text-lg">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
