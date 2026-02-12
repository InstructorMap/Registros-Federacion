'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Search, FileCheck, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/institucional', label: 'Institucional', icon: Shield },
  { href: '/', label: 'Buscador de Matrículas', icon: Search },
  { href: '/homologacion', label: 'Homologación Profesional', icon: FileCheck },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-navy-800 rounded-xl flex items-center justify-center 
                         transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg 
                         group-hover:shadow-navy-800/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat font-bold text-lg text-navy-800 leading-tight">
                REMAEP
              </span>
              <span className="hidden sm:block text-[10px] text-slate-600 -mt-1 font-medium">
                Registro Nacional
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-3 py-2 text-sm font-medium
                    transition-all duration-200 border-b-2
                    ${isActive 
                      ? 'border-navy-800 text-navy-800' 
                      : 'border-transparent text-slate-600 hover:text-navy-800 hover:border-navy-400'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-navy-800 
                     hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Sistema activo 24/7 - VERSIÓN CON VIDA */}
          <div className="hidden lg:flex items-center">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Sistema activo 24/7
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-white py-4 px-4 animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium
                    transition-colors
                    ${isActive 
                      ? 'bg-navy-50 text-navy-800' 
                      : 'text-slate-600 hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            
            {/* Mobile status indicator */}
            <div className="flex items-center space-x-3 px-4 py-3 text-sm text-slate-500 border-t border-slate-100 mt-2 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Sistema activo 24/7</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
