# Partner Pipeline System

Complete end-to-end system for identifying, contacting, and converting methodology training partners (Sandler franchisees, independent trainers, sales training firms).

## The 5 Stages

| Stage | What Happens | Tool | Tracked In |
|-------|-------------|------|------------|
| **1. Identify** | Find trainers/franchisees — Sales Nav, profile viewers, organic inbound, LSL group | LinkedIn | partner-tracker.csv |
| **2. Connect** | Connection note (2nd degree) or InMail (3rd degree) | LinkedIn manual | partner-tracker.csv (Status: Pending → Sent) |
| **3. Research** | Deep profile: methodology, unique angle, email hook | Partner dossier + web search | partner-research-dossier.md |
| **4. Cold Email** | Personalized white-label pitch from john@occ-sales.com or john@oneclickcoaching.com | Gmail via Hermes | partner-tracker.csv (Status: Cold Email Sent) |
| **5. Track** | Status progression through: Sent → Accepted → Replied → Meeting → Pilot → Active | partner-tracker.csv + LEDGER | Dashboard Partner Pipeline section |

## The Core Offer

> "You install the methodology. I built the diagnostics layer. One pilot client, 30 days, under your brand, no cost."

## Email Research Pattern

All Sandler franchisees use: `firstname.lastname@sandler.com`
Non-Sandler trainers: web search company domain, LinkedIn profile, public landing pages.

## Files

| File | Purpose |
|------|---------|
| `outreach/partner-tracker.csv` | Master tracker — all partners, status, follow-up dates |
| `outreach/partner-research-dossier.md` | Deep profiles: methodology, unique angle, personalized email hooks |
| `outreach/claude-pro-partner-prompt.md` | Claude Pro prompt for partner outreach |
| `outreach/LEDGER.md` | Daily log — partner activity recorded alongside all outreach |

## CSV Columns

`Date, Name, Company, Type, Method, Status, Follow-up Date, Notes`

Status values: `Pending → Sent → Accepted → Cold Email Sent → Replied → Meeting Booked → Pilot → Active Partner`

Type values: `Sandler Franchisee, Sandler Trainer, Independent Sales Trainer, Sales Training Firm Trainer, Sales Ops Consultant`

## Dashboard Integration

Shows in the 🤝 Partner Pipeline section of the morning dashboard. Pulls live from partner-tracker.csv.

## LEDGER Integration

Each partner action logged under daily Activity section:
- `Partner outreach: X sent`
- `Partner cold emails: X sent`
- `Partner meeting booked`
- `Partner pilot started`

## Current Pipeline (10 partners)

### Cold Email Sent (3)
- Stephanie van Dam — stephanie.vandam@sandler.com — Hamilton
- Andrew Wall — andrew.wall@sandler.com — Milton ✅ Already accepted
- Graham Rawlinson — graham.rawlinson@sandler.com — SW Ontario

### Connection Sent (3)
- Jaime Cangas — Bluemax — Dallas-Fort Worth
- Paul Kirch — BOSS Academy / Askology Method — Fort Worth
- Heather Bennett — Criteria for Success — Hoboken NJ

### Pending (4)
- Kim Piller — Sandler Oakville
- Chris Kelly — Sandler Toronto
- Francesco Ientile — Sandler Markham
- Paul Doucet — Toronto area (InMail sent)

## Scorecard

Currently: partner actions are scored under generic categories (Connection Requests: 2pts, Emails: 1pt). Partners are worth more — one partner = many clients.

Recommended additions:
- **Partner Cold Email Sent:** 5 pts (vs 1 for regular email)
- **Partner Meeting Booked:** 50 pts (vs 25 for regular discovery)
- **Partner Pilot Started:** 75 pts
- **Active Partner:** 200 pts

Not yet added to the daily scorecard. Flagged for dashboard update.
