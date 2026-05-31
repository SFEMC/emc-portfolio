import { motion, AnimatePresence } from 'motion/react'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { prefersReducedMotion } from '../hooks/useScrollAnim'

/**
 * Crossfade page transition wrapper.
 * Uses Framer Motion AnimatePresence keyed by pathname.
 * Skips the animation when prefers-reduced-motion is set.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const reduced = prefersReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
