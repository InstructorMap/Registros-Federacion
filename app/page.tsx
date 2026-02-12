import { Shield, Award, CheckCircle, FileCheck } from 'lucide-react'
import RegistrySearch from '@/components/search/RegistrySearch'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Con más vida y personalidad */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Fondo con textura sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-white" />
        
        {/* Elementos decorativos orgánicos */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-navy-800/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl" />
        
        {/* Patrón de líneas sutiles */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy-800/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy-800/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col items-center text-center">
            {/* Badge con movimiento */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur 
                          rounded-full border border-slate-200/80 shadow-sm mb-8
                          animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-navy-800 uppercase tracking-wider">
                Sistema Nacional de Verificación
              </span>
            </div>

            {/* Título con más carácter */}
            <h1 className="font-montserrat font-black text-4xl md:text-5xl lg:text-6xl max-w-5xl leading-tight">
              <span className="text-navy-800">Salvaguardando la Veracidad</span>
              <br />
              <span className="relative">
                <span className="text-slate-800">en la Emergencia Prehospitalaria</span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-navy-800 via-slate-600 to-navy-800 rounded-full" />
              </span>
            </h1>

            {/* Subtítulo con más personalidad */}
            <p className="mt-8 text-xl text-slate-600 max-w-2xl font-roboto leading-relaxed">
              Registro Nacional de Auxiliares de la Salud · 
              <span className="font-medium text-navy-800"> Alta Distinción Institucional</span>
            </p>

            {/* Métricas de confianza */}
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-navy-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-navy-800" />
                </div>
                <div className="text-left">
                  <p className="font-montserrat font-bold text-2xl text-navy-800">+50.000</p>
                  <p className="text-xs text-slate-500">Profesionales activos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-slate-800" />
                </div>
                <div className="text-left">
                  <p className="font-montserrat font-bold text-2xl text-slate-800">100%</p>
                  <p className="text-xs text-slate-500">Verificación digital</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-emerald-800" />
                </div>
                <div className="text-left">
                  <p className="font-montserrat font-bold text-2xl text-emerald-800">24/7</p>
                  <p className="text-xs text-slate-500">Disponibilidad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Buscador */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-navy-800/20 rounded-2xl blur-xl" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-navy-800 to-navy-900 
                            rounded-2xl flex items-center justify-center shadow-xl">
                <Search className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="font-montserrat font-bold text-3xl text-navy-800 text-center mt-6">
              Verificá tu matrícula
            </h2>
            <p className="mt-3 text-slate-600 text-center max-w-2xl">
              Ingresá tu DNI y obtené tu credencial digital al instante
            </p>
          </div>
          
          <RegistrySearch />
        </div>
      </section>

      {/* Sección de valores - Más orgánica */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl text-navy-800">
              Compromiso institucional
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Trabajamos para garantizar la excelencia en la atención prehospitalaria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 
                          shadow-subtle hover:shadow-elevated transition-all duration-500
                          hover:-translate-y-1">
              <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-7 h-7 text-navy-800" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-navy-800 mb-2">
                Veracidad documental
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cada matrícula es verificada contra bases oficiales de títulos y certificaciones.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 
                          shadow-subtle hover:shadow-elevated transition-all duration-500
                          hover:-translate-y-1">
              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform duration-500">
                <Award className="w-7 h-7 text-slate-800" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-navy-800 mb-2">
                Alta distinción
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Estándares de calidad académica para la emergencia prehospitalaria.
              </p>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl border border-slate-200 
                          shadow-subtle hover:shadow-elevated transition-all duration-500
                          hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform duration-500">
                <FileCheck className="w-7 h-7 text-emerald-800" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-navy-800 mb-2">
                Homologación profesional
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Proceso transparente para nuevos profesionales del sistema.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              href="/homologacion"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r 
                       from-navy-800 to-navy-900 text-white rounded-2xl
                       hover:from-navy-900 hover:to-navy-800 transition-all duration-300 
                       shadow-lg shadow-navy-800/30 group"
            >
              <span className="font-medium">Iniciar trámite de homologación</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-xs text-slate-500">
              Para profesionales con títulos nacionales o extranjeros
            </p>
          </div>
        </div>
      </section>

      {/* Barra institucional */}
      <div className="bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-6 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5" />
              Registro ID: remaep
            </span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>Vigencia 2024-2026</span>
            <span className="w-1 h-1 bg-white/30 rounded-full" />
            <span>Ministerio de Salud</span>
          </div>
        </div>
      </div>
    </div>
  )
}
