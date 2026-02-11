import RegistrySearch from '@/components/search/RegistrySearch'
import { Shield, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white overflow-hidden py-20 px-4">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy-800/30 skew-x-12 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 mb-6">
             <Shield size={16} className="text-emerald-400" />
             <span className="text-xs font-bold tracking-wider uppercase">Registro Oficial Nacional</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 leading-tight">
            Excelencia y Veracidad en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Emergencias de Salud</span>
          </h1>
          <p className="max-w-2xl text-slate-300 text-lg mb-10 leading-relaxed">
            La plataforma oficial de validación profesional para auxiliares prehospitalarios. 
            Garantía de formación, trazabilidad y respaldo institucional.
          </p>
        </div>
      </section>

      {/* Buscador - Elevado */}
      <section className="relative -mt-12 px-4 pb-20">
         <RegistrySearch />
      </section>

      {/* Features Institucionales */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-8">
        <FeatureCard title="Validación Blockchain" desc="Cada matrícula cuenta con un sello digital inalterable." />
        <FeatureCard title="Respaldo AAPS" desc="Avalado por la Asociación Argentina para la Salud." />
        <FeatureCard title="Trazabilidad Total" desc="Historial académico y profesional unificado." />
      </section>
    </div>
  )
}

function FeatureCard({title, desc}: {title: string, desc: string}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
      <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center mb-4">
        <CheckCircle className="text-navy-800" size={20} />
      </div>
      <h3 className="font-bold text-navy-900 mb-2 font-montserrat">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  )
}
