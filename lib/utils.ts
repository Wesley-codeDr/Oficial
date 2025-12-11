import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'agora mesmo'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `ha ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `ha ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `ha ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`
  }

  const diffInWeeks = Math.floor(diffInDays / 7)
  if (diffInWeeks < 4) {
    return `ha ${diffInWeeks} semana${diffInWeeks > 1 ? 's' : ''}`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `ha ${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''}`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `ha ${diffInYears} ano${diffInYears > 1 ? 's' : ''}`
}






