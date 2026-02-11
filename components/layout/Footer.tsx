import { Shield, Award, Calendar } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="font-montserrat font-bold text-lg text-navy-800">
                    REMAEP
                  </span>
                  <p className="text-xs text-slate-600">
                    Registro de Matriculados Auxiliares de la Salud
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                Salvaguardando la veracidad en la emergencia prehospitalaria mediante 
                un registro nacional de alta distinción y transparencia institucional.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-montserrat font-semibold text-sm text-navy-800 mb-4 uppercase tracking-wider">
                Institucional
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/institucional" className="text-sm text-slate-600 hover:text-navy-800 transition-colors">
                    Sobre REMAEP
                  </a>
                </li>
                <li>
                  <a href="/institucional/marco-legal" className="text-sm text-slate-600 hover:text-navy-800 transition-colors">
                    Marco Legal
                  </a>
                </li>
                <li>
                  <a href="/institucional/autoridades" className="text-sm text-slate-600 hover:text-navy-800 transition-colors">
                    Autoridades
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-montserrat font-semibold text-sm text-navy-800 mb-4 uppercase tracking-wider">
                Contacto
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-slate-600">
                  Mesa de ayuda: 0800-REMAEP
                </li>
                <li className="text-sm text-slate-600">
                  consultas@remaep.gob.ar
                </li>
                <li className="flex items-center space-x-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Lun a Vie 9:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-slate-500">
                © {currentYear} REMAEP. Todos los derechos reservados.
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-xs text-slate-500">
                Registro ID: remaep
              </span>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <Award className="w-4 h-4 text-navy-600" />
              <span className="text-xs text-slate-600 font-medium">
                Versión 2.0.0 · Alta Distinción
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
