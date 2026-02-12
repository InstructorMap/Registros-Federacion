'use client'

import { Award, Calendar, Shield, CheckCircle, XCircle, Fingerprint, QrCode } from 'lucide-react'
import Image from 'next/image'
import { formatDate, formatDNI } from '@/lib/utils'

interface CredencialDigitalProps {
  matricula: {
    dni_alumno: string
    apellido: string
    nombre: string
    curso: string
    estado: 'ACTIVO' | 'SUSPENDIDO'
    fecha_vencimiento: string
    foto_url: string | null
  }
}

export default function CredencialDigital({ matricula }: CredencialDigitalProps) {
  return (
    <div className="relative max-w-3xl mx-auto group">
      {/* Efecto de profundidad */}
      <div className="absolute -inset-1 bg-gradient-to-r from-navy-800/20 via-slate-400/20 to-navy-800/20 
                    rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800/5 via-transparent to-slate-800/5 
                    rounded-2xl pointer-events-none" />
      
      {/* Tarjeta principal */}
      <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl 
                    overflow-hidden transition-all duration-500 hover:shadow-3xl">
        
        {/* Barra superior decorativa */}
        <div className="h-2 bg-gradient-to-r from-navy-800 via-slate-600 to-navy-800" />
        
        <div className="p-6 md:p-8">
          {/* Header con identidad */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-navy-800 rounded-xl blur-md opacity-30" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-navy-800 to-navy-900 
                              rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-montserrat font-bold text-lg text-navy-800">
                    REMAEP
                  </span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[10px] font-mono text-slate-600">
                    ID: remaep
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Fingerprint className="w-3 h-3" />
                  Registro Nacional · Verificado
                </p>
              </div>
            </div>
            
            {/* Badge de estado */}
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-full
              ${matricula.estado === 'ACTIVO' 
                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-700 border border-emerald-200' 
                : 'bg-gradient-to-r from-crimson-50 to-crimson-100/80 text-crimson-700 border border-crimson-200'
              }
            `}>
              {matricula.estado === 'ACTIVO' 
                ? <CheckCircle className="w-4 h-4" />
                : <XCircle className="w-4 h-4" />
              }
              <span className="font-bold text-sm uppercase tracking-wider">
                {matricula.estado === 'ACTIVO' ? 'Matrícula Activa' : 'Suspendida'}
              </span>
            </div>
          </div>

          {/* Área de identidad profesional - FOTO REDIMENSIONADA */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Foto - AHORA 80x80 (NO más gigante) */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-start">
              <div className="relative group/photo">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-navy-800 to-slate-700 
                              rounded-2xl blur opacity-30 group-hover/photo:opacity-60 transition duration-300" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden 
                              ring-4 ring-white shadow-xl">
                  {matricula.foto_url ? (
                    <Image
                      src={matricula.foto_url}
                      alt={`${matricula.nombre} ${matricula.apellido}`}
                      fill
                      className="object-cover scale-110 group-hover/photo:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 
                                  flex items-center justify-center">
                      <span className="text-2xl font-montserrat font-bold text-slate-400">
                        {matricula.nombre[0]}{matricula.apellido[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sello de autenticidad */}
              <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 
                            rounded-full border border-slate-200/80">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-slate-600 font-medium">
                  Verificado
                </span>
              </div>
            </div>

            {/* Datos personales */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="col-span-1 sm:col-span-2">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Profesional matriculado
                </span>
                <h2 className="font-montserrat font-bold text-xl md:text-2xl text-slate-800 mt-1">
                  {matricula.apellido}, {matricula.nombre}
                </h2>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  DNI
                </span>
                <p className="font-mono text-lg text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg inline-block">
                  {formatDNI(matricula.dni_alumno)}
                </p>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Especialidad
                </span>
                <div className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-navy-700 flex-shrink-0 mt-0.5" />
                  <p className="font-medium text-slate-800">
                    {matricula.curso}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Vigencia
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <p className="text-slate-700 font-medium">
                    {formatDate(matricula.fecha_vencimiento)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Emisión
                </span>
                <p className="text-slate-600">
                  {new Date().toLocaleDateString('es-AR')}
                </p>
              </div>
            </div>
          </div>

          {/* Footer de verificación */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    Código: <span className="font-mono">REMAEP-{matricula.dni_alumno}</span>
                  </span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-200" />
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Tiempo real
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-400">
                  Válido en todo el territorio nacional
                </span>
                <div className="px-2 py-1 bg-slate-100 rounded-md">
                  <span className="text-[10px] font-mono text-slate-600">
                    RSA 2048
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
