/**
 * Private collections hub.
 *
 * The page at /collections lists the private collections and links into each.
 * It is shared by direct link only, like the collections themselves: not on
 * the public site, noindex/nofollow, kept out of robots.txt and the sitemap.
 *
 * TO ADD A COLLECTION to the hub, add one entry below with its landing path.
 */

export interface CollectionLink {
  title: string
  blurb: string
  /** the collection's own private landing page */
  path: string
}

export const COLLECTIONS_TITLE = 'Collections'
export const COLLECTIONS_BASE = '/collections'

export const collections: CollectionLink[] = [
  {
    title: 'Eyes Wide Open',
    blurb: 'Essays on thinking for yourself and seeing past the noise.',
    path: '/eyes-wide-open',
  },
  {
    title: 'The Art of Systemic Design',
    blurb: 'Short essays on seeing the systems around us and living well among them.',
    path: '/art-of-systemic-design',
  },
]
