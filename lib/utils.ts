import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export const formatDNI = (dni: string): string => {
  return dni.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const validateDNI = (dni: string): boolean => {
  return /^\d{7,8}$/.test(dni)
}

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '')
}
