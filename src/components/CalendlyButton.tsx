import type { ReactNode, MouseEvent } from 'react'

const CALENDLY_URL = 'https://calendly.com/samuel-field-eddystonemersey/30min'

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
    }
  }
}

interface CalendlyButtonProps {
  className?: string
  children: ReactNode
  onAfter?: () => void
}

export default function CalendlyButton({ className, children, onAfter }: CalendlyButtonProps) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (typeof window !== 'undefined' && window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
    }
    onAfter?.()
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
