# EMC Portfolio — Site Restructure Brief

## Site Structure

| Route | Purpose | Status |
|---|---|---|
| `/` | Home — tightened landing page, hub to everything else | Refine existing |
| `/experience` | Full career history, moved off home page | New page |
| `/articles` | Writing — local markdown + external links | New section |
| `/articles/:slug` | Individual article pages rendered on-site | New route |
| `/projects` | Hobby builds, AI experiments, creative work | New page |
| `/resources` | Curated reading, feeds, people to follow | No changes |

---

## 1. Home Page Refinement (`/`)

Keep Hero, About ("How I work"), Capabilities ("How I help"), and Contact/footer. Remove the Experience section from the home page — it moves to `/experience`.

Add visible CTAs and links pointing visitors to Experience, Articles, Projects, and Resources. The home page should read as a clear entry point to the rest of the site, not try to be the entire site. Tighten spacing and hierarchy.

## 2. Resources Page (`/resources`)

Do not change anything.

## 3. Experience Page (`/experience`) — NEW

Move "Where I've Worked" content here. Expand each role with more room for detail — achievements, technologies used, team context, outcomes. Reverse chronological order.

Store role data in a structured file (JSON or TypeScript data file) so new roles can be added without touching layout code.

## 4. Articles Section (`/articles` and `/articles/:slug`) — NEW

**Listing page (`/articles`):**
- All articles in reverse chronological order
- Each entry shows title, date, summary, tags
- Tag filtering

**Article page (`/articles/:slug`):**
- Renders markdown content on-site with proper typography (headings, code blocks, links, lists)

**Two content types:**
- **Local articles:** Markdown files in `/src/content/articles/` with frontmatter: `title`, `date`, `summary`, `tags`, `slug`
- **External articles:** Entries in `/src/content/articles/external.json` with same fields plus `url`. These appear in the listing but open in a new tab.

Both types appear together, sorted by date. Adding an article means dropping a `.md` file or adding a JSON entry.

## 5. Projects Page (`/projects`) — NEW

A showcase for hobby and side projects. Card grid layout with category filtering.

**Each project entry supports:**
- `title`, `date`, `summary`, `tags`
- `image` (optional screenshot/thumbnail)
- `repoUrl` (optional GitHub link)
- `liveUrl` (optional live demo link)
- `category` — one of: "Code", "AI Experiment", "Creative"

**Store in:** `/src/content/projects.json`

**Starter entries to include:**

```json
[
  {
    "title": "EMC Portfolio",
    "date": "2025-09-01",
    "summary": "My personal consulting portfolio site. Built from scratch to showcase my work across UK government and higher education.",
    "tags": ["React", "TypeScript", "Tailwind", "Vite", "Vercel"],
    "category": "Code",
    "liveUrl": "",
    "repoUrl": ""
  },
  {
    "title": "Base Physiotherapy",
    "date": "",
    "summary": "",
    "tags": [],
    "category": "Code",
    "liveUrl": "",
    "repoUrl": ""
  }
]
```

Fill in the empty fields (dates, summaries, URLs, tags) once ready.

---

## Design Constraints

- Match existing dark theme, Tailwind config, and Barlow font exactly
- Update Navbar: Home, Experience, Articles, Projects, Resources
- Use Motion for page transitions, consistent with existing animations
- Fully mobile responsive
- Markdown rendering with proper typography

## Do Not Touch

- Resources page (`/resources`)
- `vercel.json`
- `api/feed.js`
