# CLAUDE.md — One Click Coaching Website

## Behavioral Guidelines (Karpathy-Inspired)

1. **Surface assumptions.** If a request is ambiguous, state what you're assuming and ask before implementing.
2. **Minimum output.** No speculative features. No paragraphs that weren't asked for. If it could be 100 words instead of 300, rewrite.
3. **Match existing style.** Blog posts follow the published format exactly. HTML matches the template structure. Don't "improve" adjacent code.
4. **Verify before claiming done.** Deployed means the URL returns 200. Published means the blog index is updated. Don't claim what you haven't checked.

## Project Conventions

### Blog Posts
- HTML files in `/blog/` with `.html` extension
- Template: copy from the most recent published post
- Every post gets: Article + VideoObject + BreadcrumbList + FAQPage JSON-LD
- Video poster: frame capture from watermarked MP4, stored in `/video/`
- Blog index (`blog.html`) must be updated with new post card

### Deploy
- Static site on Vercel: `vercel --prod --yes --force`
- Run from repo root: `/Users/johncunningham/one-click-coaching-website`
- Verify with curl after deploy

### Content Queue
- Approved drafts: `content-queue/blog/approved/`
- Published posts: `content-queue/blog/published/`
- LinkedIn queue: `content-queue/linkedin/approved/`

### Outreach
- Connection notes: named `connection-notes-<source>-<date>.html`
- Saved to `/outreach/`
- Open on John's Mac with `open` command

### Voice
- John Cunningham, founder. Direct, personal, no corporate language.
- Banned: "in today's fast-paced," "unlock potential," "game-changer," "leverage," "deep dive"
- Personal experience in every blog post. Real stories, not abstractions.

### Design Standards (Power Design — enforced)
Every page must pass these 8 rules. Run `verify.js` or check manually before deploy.

| Rule | Standard | Current Status |
|------|----------|----------------|
| **Type scale** | 4 sizes max, 1.333 modular ratio (24/32/42/56/75) | ❌ 16 ad-hoc sizes |
| **Body text** | ≥24px | ❌ 14–20px |
| **Line length** | ≤60 characters | ❌ up to 136ch |
| **Accent color** | 10% of pixel area (terracotta #C8501E) | ❌ 1% — nearly invisible |
| **Edge safe-zone** | ≥96px from every edge on 1920px | ❌ 36 violations |
| **Spacing grid** | 8-pt grid (4/8/16/24/32/48/64/96/128) | ❌ 6px found |
| **Color split** | 60% dominant / 30% secondary / 10% accent | ❌ Secondary 21%, accent 1% |
| **WCAG contrast** | 4.5:1 body, 7:1 target | ⚠️ Passes AA, fails AAA projection |

**Brand tokens** (from `occ-brand-style.md`):
- `--color-dominant: #FAFAF8` (warm off-white)
- `--color-secondary: #0F1B2D` (navy)
- `--color-accent: #C8501E` (terracotta — signal orange-red)
- `--color-heading: #0F1B2D`
- `--color-body: #33404F`
- Font: Inter (display 600, body 400), JetBrains Mono for metrics
- Precedence: Accessibility > brand > aesthetics. Never sacrifice contrast for style.
