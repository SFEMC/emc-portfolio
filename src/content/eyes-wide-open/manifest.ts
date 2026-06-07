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
  /** 'poem' renders with line breaks and stanzas preserved, not reflowed as prose */
  type: 'essay' | 'poem'
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

// Canonical reading order for the whole collection. Some entries may not be
// written yet; the list below stays in this order and the page logic skips any
// whose markdown file is absent, so prev/next chain through what is present.
export const ewoEssays: EWOEssay[] = [
  { order: 1, slug: 'the-highlight-reel', title: 'The Highlight Reel', status: 'draft', type: 'essay' },
  { order: 2, slug: 'everyone-at-our-fingertips-nobody-in-reach', title: 'Everyone at Our Fingertips, Nobody in Reach', status: 'draft', type: 'essay' },
  { order: 3, slug: 'attention-is-the-whole-game', title: 'Attention Is the Whole Game', status: 'draft', type: 'essay' },
  { order: 4, slug: 'in-praise-of-boredom', title: 'In Praise of Boredom', status: 'draft', type: 'essay' },
  { order: 5, slug: 'sapere-aude', title: 'Sapere Aude', status: 'draft', type: 'essay' },
  { order: 6, slug: 'the-map-is-not-the-territory', title: 'The Map Is Not the Territory', status: 'draft', type: 'essay' },
  { order: 7, slug: 'follow-the-incentive', title: 'Follow the Incentive', status: 'draft', type: 'essay' },
  { order: 8, slug: 'and-then-what', title: 'And Then What', status: 'draft', type: 'essay' },
  { order: 9, slug: 'the-planes-that-came-back', title: 'The Planes That Came Back', status: 'draft', type: 'essay' },
  { order: 10, slug: 'written-by-the-victor-rewritten-by-the-feed', title: 'Written by the Victor, Rewritten by the Feed', status: 'draft', type: 'essay' },
  { order: 11, slug: 'propaganda-lives-in-your-pocket', title: 'Propaganda Lives in Your Pocket', status: 'draft', type: 'essay' },
  { order: 12, slug: 'bread-and-circuses', title: 'Bread and Circuses', status: 'draft', type: 'essay' },
  { order: 13, slug: 'the-ancient-world-is-still-talking', title: 'The Ancient World Is Still Talking', status: 'draft', type: 'essay' },
  { order: 14, slug: 'philosophy-is-a-tool-not-a-hobby', title: 'Philosophy Is a Tool, Not a Hobby', status: 'draft', type: 'essay' },
  { order: 15, slug: 'money-is-a-shared-story', title: 'Money Is a Shared Story', status: 'draft', type: 'essay' },
  { order: 16, slug: 'the-forest-was-the-first-system', title: 'The Forest Was the First System', status: 'draft', type: 'essay' },
  { order: 17, slug: 'the-lottery-of-birth', title: 'The Lottery of Birth', status: 'draft', type: 'essay' },
  { order: 18, slug: 'faith', title: 'Faith', status: 'draft', type: 'essay' },
  { order: 19, slug: 'memento-mori', title: 'Memento Mori', status: 'draft', type: 'essay' },
  { order: 20, slug: 'the-case-for-hard-things', title: 'The Case for Hard Things', status: 'draft', type: 'essay' },
  { order: 21, slug: 'learning-is-the-whole-point', title: 'Learning Is the Whole Point', status: 'draft', type: 'essay' },
  { order: 22, slug: 'writing-for-no-one', title: 'Writing for No One', status: 'draft', type: 'essay' },
  { order: 23, slug: 'on-being-alone', title: 'On Being Alone', status: 'draft', type: 'essay' },
  { order: 24, slug: 'green-lights', title: 'Green Lights', status: 'draft', type: 'essay' },
  { order: 25, slug: 'bring-back-chalance', title: 'Bring Back Chalance', status: 'draft', type: 'essay' },
  { order: 26, slug: 'touch-grass', title: 'Touch Grass', status: 'draft', type: 'essay' },
  { order: 27, slug: 'what-is-life', title: 'What Is Life', status: 'draft', type: 'poem' },
]

/** Full canonical order, written or not. */
export const ewoOrdered: EWOEssay[] = [...ewoEssays].sort((a, b) => a.order - b.order)

// Slugs that actually have a markdown file present in the folder.
const presentFiles = import.meta.glob('/src/content/eyes-wide-open/*.md', { query: '?raw', import: 'default' })
const presentSlugs = new Set(
  Object.keys(presentFiles).map((p) => p.split('/').pop()!.replace(/\.md$/, '')),
)

/**
 * Essays that are present, in canonical order. The landing list, the routes
 * and the prev/next links all read this, so missing pieces drop out and the
 * chain closes over what exists.
 */
export const ewoPresent: EWOEssay[] = ewoOrdered.filter((e) => presentSlugs.has(e.slug))

export function ewoBySlug(slug: string): EWOEssay | undefined {
  return ewoPresent.find((e) => e.slug === slug)
}

/** 1-based position of an essay within the present list (for display). */
export function ewoNumber(slug: string): number {
  return ewoPresent.findIndex((e) => e.slug === slug) + 1
}

/** Previous and next present essays for a slug; null at the ends. */
export function ewoNeighbours(slug: string): { prev: EWOEssay | null; next: EWOEssay | null } {
  const i = ewoPresent.findIndex((e) => e.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? ewoPresent[i - 1] : null,
    next: i < ewoPresent.length - 1 ? ewoPresent[i + 1] : null,
  }
}
