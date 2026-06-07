/**
 * The Art of Systemic Design — single source of truth for the private series.
 *
 * The series is organised into THEMES. Each theme has a heading and its own
 * ordered list of essays, and all of them appear on the home page at
 * /art-of-systemic-design. Previous/next links flow within a theme.
 *
 * TO ADD A NEW ESSAY to an existing theme, do two things and nothing else:
 *   1. Add one markdown file in this folder named <slug>.md with frontmatter
 *      (title, series, part, status) and the essay body.
 *   2. Add one entry to that theme's `essays` array below, in part order.
 *
 * TO ADD A NEW THEME, add one more group object to `aosdGroups` with its own
 * title and essays array. The home page, the routes and the prev/next links
 * all read from this one file, so that is the whole job.
 *
 * Slugs must be unique across the whole series (the route is flat:
 * /art-of-systemic-design/<slug>). Part numbers are local to each theme.
 */

export interface AoSDEssay {
  /** order within its theme */
  part: number
  /** lowercase, hyphenated, unique across the series; matches <slug>.md */
  slug: string
  /** full title, including the series stem; the on-page heading may drop the stem */
  title: string
  status: 'draft' | 'published'
}

export interface AoSDGroup {
  id: string
  /** theme heading shown on the home page */
  title: string
  /** optional one-line description under the theme heading */
  intro?: string
  essays: AoSDEssay[]
}

export const SERIES_TITLE = 'The Art of Systemic Design'
export const AOSD_BASE = '/art-of-systemic-design'
const STEM = 'The Art of Systemic Design:'

export const aosdGroups: AoSDGroup[] = [
  {
    // Rename this theme heading freely; it is the founding arc of the series.
    id: 'seeing-and-living-with-systems',
    title: 'Seeing and Living with Systems',
    essays: [
      { part: 1, slug: 'the-art-of-seeing-systems', title: 'The Art of Systemic Design: The Art of Seeing Systems', status: 'draft' },
      { part: 2, slug: 'reading-the-room', title: 'The Art of Systemic Design: Reading the Room', status: 'draft' },
      { part: 3, slug: 'why-its-an-art-not-a-science', title: "The Art of Systemic Design: Why It's an Art Not a Science", status: 'draft' },
      { part: 4, slug: 'the-small-push', title: 'The Art of Systemic Design: The Small Push', status: 'draft' },
      { part: 5, slug: 'we-are-made-of-systems', title: 'The Art of Systemic Design: We Are Made of Systems', status: 'draft' },
      { part: 6, slug: 'the-systems-you-cant-change', title: "The Art of Systemic Design: The Systems You Can't Change", status: 'draft' },
      { part: 7, slug: 'designing-your-own-life', title: 'The Art of Systemic Design: Designing Your Own Life', status: 'draft' },
    ],
  },
  // To add a new theme, copy the object above, give it a new id/title and its
  // own essays array, then add the matching markdown files.
]

/** Themes in order, each with its essays sorted by part. Index page reads this. */
export const aosdGroupsOrdered: AoSDGroup[] = aosdGroups.map((g) => ({
  ...g,
  essays: [...g.essays].sort((a, b) => a.part - b.part),
}))

/** First essay of the first theme, for the "Start with Part 1" link. */
export const aosdFirstEssay: AoSDEssay | undefined = aosdGroupsOrdered[0]?.essays[0]

export interface AoSDLocation {
  essay: AoSDEssay
  group: AoSDGroup
  prev: AoSDEssay | null
  next: AoSDEssay | null
}

/** Everything an article page needs for a slug: its essay, its theme and the
 * previous/next within that theme. Returns null when the slug is unknown. */
export function aosdLocate(slug: string): AoSDLocation | null {
  for (const group of aosdGroupsOrdered) {
    const i = group.essays.findIndex((e) => e.slug === slug)
    if (i !== -1) {
      return {
        essay: group.essays[i],
        group,
        prev: i > 0 ? group.essays[i - 1] : null,
        next: i < group.essays.length - 1 ? group.essays[i + 1] : null,
      }
    }
  }
  return null
}

/** Drop the repeated series stem for the on-page heading. */
export function aosdDisplayTitle(title: string): string {
  return title.startsWith(STEM) ? title.slice(STEM.length).trim() : title
}
