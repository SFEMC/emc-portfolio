import { useEffect } from 'react'

/**
 * Adds <meta name="robots" content="noindex, nofollow"> to the document head
 * while the calling page is mounted, then removes it on unmount so the rest of
 * the site stays indexable.
 *
 * Use on private pages. A matching X-Robots-Tag header in vercel.json covers
 * crawlers that do not run JavaScript.
 *
 * Optionally sets the document title for the browser tab.
 */
export function useNoIndex(title?: string) {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)

    const previousTitle = document.title
    if (title) document.title = title

    return () => {
      document.head.removeChild(meta)
      if (title) document.title = previousTitle
    }
  }, [title])
}
