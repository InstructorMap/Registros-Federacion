'use client'

import { FileCheck, Shield, Clock, Award } from 'lucide-react'
import HomologacionForm from '@/components/homologacion/HomologacionForm'

export default function HomologacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-navy-800/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center space-x-2 bg-navy-50 px-4 py-2 rounded-full border border-navy-100 mb-6">
              <FileCheck className="w-4 h-4 text-navy-800" />
              <span className="text-xs font-medium text-navy-800 uppercase tracking-wider">
                Homologación Profesional
              </span>
            </div>
            
            <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-navy-800 max-w-4xl leading-tight">
              Obtenga su Matrícula Nacional
            </h1>
            
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Proceso transparente y ágil para profesionales de la salud. Inicie su trámite de validación 100% digital.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-navy-800" />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-navy-800">Plazo de evaluación</h3>
                <p className="text-sm text-slate-600 mt-1">15 días hábiles desde la presentación</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-navy-800" />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-navy-800">Validez nacional</h3>
                <p className="text-sm text-slate-600 mt-1">Reconocida en todo el territorio argentino</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-subtle">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-navy-800" />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-navy-800">Verificación digital</h3>
                <p className="text-sm text-slate-600 mt-1">Sello de autenticidad blockchain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 px-4">
        <HomologacionForm />
      </section>
    </div>
  )
}
