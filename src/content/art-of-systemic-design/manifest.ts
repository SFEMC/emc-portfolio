/**
 * The Art of Systemic Design — single source of truth for the private series.
 *
 * TO ADD A NEW ESSAY (e.g. Part 8), do two things and nothing else:
 *   1. Add one markdown file in this folder named <slug>.md with frontmatter
 *      (title, series, part, status) and the essay body.
 *   2. Add one entry to the `aosdManifest` array below, in part order.
 *
 * The index list, the article routes and the previous/next links all read
 * from this one array, so those two steps are the whole job.
 */

export interface AoSDEntry {
  part: number
  /** lowercase, hyphenated; matches the markdown filename <slug>.md */
  slug: string
  /** full title, including the series stem; the on-page heading may drop the stem */
  title: string
  status: 'draft' | 'published'
}

export const SERIES_TITLE = 'The Art of Systemic Design'
export const AOSD_BASE = '/art-of-systemic-design'
const STEM = 'The Art of Systemic Design:'

export const aosdManifest: AoSDEntry[] = [
  { part: 1, slug: 'the-art-of-seeing-systems', title: 'The Art of Systemic Design: The Art of Seeing Systems', status: 'draft' },
  { part: 2, slug: 'reading-the-room', title: 'The Art of Systemic Design: Reading the Room', status: 'draft' },
  { part: 3, slug: 'why-its-an-art-not-a-science', title: "The Art of Systemic Design: Why It's an Art Not a Science", status: 'draft' },
  { part: 4, slug: 'the-small-push', title: 'The Art of Systemic Design: The Small Push', status: 'draft' },
  { part: 5, slug: 'we-are-made-of-systems', title: 'The Art of Systemic Design: We Are Made of Systems', status: 'draft' },
  { part: 6, slug: 'the-systems-you-cant-change', title: "The Art of Systemic Design: The Systems You Can't Change", status: 'draft' },
  { part: 7, slug: 'designing-your-own-life', title: 'The Art of Systemic Design: Designing Your Own Life', status: 'draft' },
]

/** Manifest sorted by part. Everything downstream reads this. */
export const aosdOrdered: AoSDEntry[] = [...aosdManifest].sort((a, b) => a.part - b.part)

export function aosdBySlug(slug: string): AoSDEntry | undefined {
  return aosdOrdered.find((e) => e.slug === slug)
}

/** Previous and next entries for a slug; null at the ends. */
export function aosdNeighbours(slug: string): { prev: AoSDEntry | null; next: AoSDEntry | null } {
  const i = aosdOrdered.findIndex((e) => e.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? aosdOrdered[i - 1] : null,
    next: i < aosdOrdered.length - 1 ? aosdOrdered[i + 1] : null,
  }
}

/** Drop the repeated series stem for the on-page heading. */
export function aosdDisplayTitle(title: string): string {
  return title.startsWith(STEM) ? title.slice(STEM.length).trim() : title
}
