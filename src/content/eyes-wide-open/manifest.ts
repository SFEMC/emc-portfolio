/**
 * Eyes Wide Open — single source of truth for this private collection.
 *
 * Sibling of The Art of Systemic Design. Same pattern: one ordered manifest
 * drives the landing list, the routes and the previous/next links.
 *
 * The foreword ("An Introduction", type "foreword") is the collection's
 * introduction. It shows in full on the landing page and is not a numbered
 * essay, so it lives in `ewoForeword`, separate from the essay list.
 *
 * TO ADD A NEW ESSAY, do two things and nothing else:
 *   1. Add one markdown file in this folder named <slug>.md with frontmatter
 *      (title, collection, status, type) and the essay body.
 *   2. Add one entry to the `ewoEssays` array below, in reading order.
 *
 * Slugs must be unique (the route is flat: /eyes-wide-open/<slug>).
 */

export interface EWOEssay {
  /** reading order */
  order: number
  /** lowercase, hyphenated, unique; matches <slug>.md */
  slug: string
  title: string
  status: 'draft' | 'published'
  type: 'essay'
}

export interface EWOForeword {
  slug: string
  title: string
  status: 'draft' | 'published'
  type: 'foreword'
}

export const COLLECTION_TITLE = 'Eyes Wide Open'
export const EWO_BASE = '/eyes-wide-open'

/** The foreword. Shown in full at the top of the landing page. */
export const ewoForeword: EWOForeword = {
  slug: 'an-introduction',
  title: 'An Introduction',
  status: 'draft',
  type: 'foreword',
}

export const ewoEssays: EWOEssay[] = [
  { order: 1, slug: 'sapere-aude', title: 'Sapere Aude', status: 'draft', type: 'essay' },
  { order: 2, slug: 'written-by-the-victor-rewritten-by-the-feed', title: 'Written by the Victor Rewritten by the Feed', status: 'draft', type: 'essay' },
  { order: 3, slug: 'propaganda-lives-in-your-pocket', title: 'Propaganda Lives in Your Pocket', status: 'draft', type: 'essay' },
  { order: 4, slug: 'the-ancient-world-is-still-talking', title: 'The Ancient World Is Still Talking', status: 'draft', type: 'essay' },
  { order: 5, slug: 'philosophy-is-a-tool-not-a-hobby', title: 'Philosophy Is a Tool Not a Hobby', status: 'draft', type: 'essay' },
]

/** Essays in reading order. The landing list and the routes read this. */
export const ewoOrdered: EWOEssay[] = [...ewoEssays].sort((a, b) => a.order - b.order)

export function ewoBySlug(slug: string): EWOEssay | undefined {
  return ewoOrdered.find((e) => e.slug === slug)
}

/** Previous and next essays for a slug; null at the ends. */
export function ewoNeighbours(slug: string): { prev: EWOEssay | null; next: EWOEssay | null } {
  const i = ewoOrdered.findIndex((e) => e.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? ewoOrdered[i - 1] : null,
    next: i < ewoOrdered.length - 1 ? ewoOrdered[i + 1] : null,
  }
}
