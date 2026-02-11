'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, FileText, Clock, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function HomologacionSuccessPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    const fetchSolicitud = async () => {
      if (id) {
        const { data } = await supabase
          .from('homologaciones')
          .select('email')
          .eq('id', id)
          .single()
        
        if (data) {
          setEmail(data.email)
        }
      }
    }
    fetchSolicitud()
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-elevated">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-10 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-white font-montserrat font-bold text-2xl md:text-3xl">
              ¡Solicitud enviada con éxito!
            </h1>
            <p className="text-white/90 text-lg mt-2">
              N° de trámite: <span className="font-mono font-bold">{id || 'PENDIENTE'}</span>
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h2 className="font-montserrat font-semibold text-navy-800 mb-4">
                Próximos pasos
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-navy-800">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Revisión documental</p>
                    <p className="text-sm text-slate-600">
                      Evaluaremos su título y documentación adjunta
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-navy-800">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Verificación de antecedentes</p>
                    <p className="text-sm text-slate-600">
                      Validación en sistemas nacionales de salud
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-navy-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-navy-800">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Emisión de matrícula</p>
                    <p className="text-sm text-slate-600">
                      Generación de credencial digital y envío por email
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <Mail className="w-5 h-5 text-navy-800 flex-shrink-0" />
              <p className="text-sm text-slate-700">
                Hemos enviado un email a <span className="font-semibold">{email || 'su correo'}</span> con los detalles.
              </p>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <Clock className="w-5 h-5 text-slate-600 flex-shrink-0" />
              <p className="text-sm text-slate-600">
                Tiempo estimado de evaluación: <span className="font-semibold">15 días hábiles</span>
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-navy-800 text-white rounded-xl hover:bg-navy-700 transition-all duration-300"
              >
                <span>Ir al buscador</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={() => window.print()}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy-800 text-navy-800 rounded-xl hover:bg-navy-50 transition-all duration-300 font-medium"
              >
                <FileText className="w-4 h-4 mr-2" />
                Imprimir comprobante
              </button>
            </div>
            
            <p className="text-[10px] text-center text-slate-400 mt-4">
               Este documento tiene carácter de declaración jurada de inicio de trámite. REMAEP.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
