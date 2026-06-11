# One Click Coaching Content Dashboard

This is the chat-readable index for OCC content operations.

## Audience

Decision-makers and influencers at companies with roughly 5-50 sales reps:
- VP Sales
- Sales Managers
- Sales Enablement leaders
- CROs

Core wedge: sales training drift after formal training because reps are undercoached and behavior reinforcement does not happen consistently.

## Queue Layout

- `research/` — weekly research briefs and content angles
- `blog/drafts/` — generated blog drafts awaiting review
- `blog/reviews/` — critic/advisor reviews for blog drafts
- `blog/approved/` — blog drafts ready for human approval/publishing
- `blog/published/` — blog posts published to website
- `blog/rejected/` — drafts that need rebuilds
- `linkedin/drafts/` — generated LinkedIn drafts awaiting review
- `linkedin/reviews/` — critic/advisor reviews for LinkedIn posts
- `linkedin/approved/` — LinkedIn posts ready for human approval/posting
- `linkedin/rejected/` — posts that need rebuilds
- `outreach/drafts/` — cold outreach drafts awaiting review
- `outreach/reviews/` — critic/advisor reviews for outreach
- `outreach/approved/` — outreach approved for human-controlled sending
- `outreach/rejected/` — outreach that needs rebuilds
- `video/drafts/` — generated video scripts awaiting review
- `video/approved/` — scripts approved for HeyGen production
- `video/produced/` — videos produced and uploaded (with URLs)
- `video/rejected/` — scripts that need rebuilds

## Standing Rules

- No automated publishing without explicit approval.
- No automated cold outreach sending while inboxes are warming.
- All drafts should be reviewed against the OCC critic/advisor rubric.
- Content should speak to leadership-level consequences, not individual rep self-improvement.

### Design Approval Gate (Power Design)
Before any blog post, carousel, or visual asset goes to approved/:
- **Type check:** ≤4 sizes, 1.333 modular scale, body ≥24px
- **Color check:** One accent (#C8501E) max. OCC brand tokens only.
- **Spacing check:** 8-pt grid. No 6px, 10px, or ad-hoc values.
- **Contrast check:** Body ≥4.5:1. Heading ≥3:1.
- **Whitespace check:** ≥40% empty pixels.
- Brand file reference: `~/Downloads/occ-brand-style.md`

## Useful Hermes Requests

- `show my OCC queue`
- `show latest LinkedIn draft and review`
- `show latest blog draft and review`
- `draft a new OCC LinkedIn post from the latest research brief`
- `revise this to pass the OCC critic/advisor review`
- `what is outstanding on the OCC app audit?`
- `what is blocking Fathom integration?`
