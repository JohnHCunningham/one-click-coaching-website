# OCC Outreach Pipeline — Automated Personalization

## The Stack ($148/mo)

Sales Navigator ($99) → Evaboot ($19) → Enrichment Script (free) → Instantly ($30)

## Full Workflow

### Step 1: Build Sales Nav List (John — 30 min/week)
- Advanced search: VP Sales / Sales Director / Sales Manager
- Company size: 20-200 employees
- Keywords: Sandler, sales training, MEDDIC, Challenger, SPIN
- Save as lead list

### Step 2: Export with Evaboot (John — 5 min)
- Open Sales Nav lead list
- Click Evaboot Chrome extension
- Export to CSV
- Gets: name, title, company, LinkedIn URL, email (if available), company website

### Step 3: Enrich with AI (Automated — 5-10 min runtime for 50 leads)
```
cd /Users/johncunningham/one-click-coaching-website/outreach
export DEEPSEEK_API_KEY=$(grep DEEPSEEK_API_KEY /Users/johncunningham/.hermes/.env | cut -d= -f2)
python3 enrich-leads.py your-export.csv

# If no website scraping needed (faster):
python3 enrich-leads.py your-export.csv --no-scrape --max 50
```

This produces `your-export_enriched.csv` with an `icebreaker` column.

### Step 4: Upload to Instantly (John — 2 min)
- Import enriched CSV
- Map fields: email, firstName, lastName, custom fields (icebreaker, title, company)
- In email templates, use {{icebreaker}} to insert the personalized line

### Step 5: Campaign Sequence (Automated by Instantly)

Email 1 (Day 1) — The Gap:
```
Subject: {{company}}'s coaching gap

{{firstName}} —

{{icebreaker}}

Most sales training has a half-life of 72 hours. Your reps understood the methodology in the room, but execution decays the moment pressure hits.

We built One Click Coaching to close that gap — scoring calls against the methodology your team already knows and delivering coaching automatically.

Worth 20 minutes to see what that looks like for {{company}}?

John Cunningham
```

Email 2 (Day 4) — Proof Point:
```
Subject: One metric

{{firstName}} —

One pattern we see consistently: the gap between what managers think is happening on calls and what's actually happening is wider than anyone expects.

We scored 37 calls for a team similar to {{company}}'s size — the average gap between trained methodology and live execution was 40%.

That gap is costing you pipeline. The fix is faster than you think.

Want to see the scoring output?

John
```

Email 3 (Day 9) — Contrarian:
```
Subject: Your managers already know

{{firstName}} —

Your managers can feel the drift. They just can't prove it.

One Click Coaching gives them the data — every call, every rep, scored against your methodology. No more gut feelings. No more waiting for QBRs.

What would it be worth to know exactly where every rep stands on Monday morning?

John
```

### Step 6: Reply Handling (John — 10 min/day)
- Check Instantly for replies
- Positive replies → book discovery call
- Questions → answer, then ask for call
- "Not interested" → note reason, refine targeting

## Delivery Cadence

- Monday: Build Sales Nav list, export with Evaboot
- Tuesday: Run enrichment script, review icebreakers
- Wednesday: Upload to Instantly, launch campaign
- Thursday-Monday: Monitor replies, handle responses

## Weekly Targets (Realistic)

- 50-80 new leads per week
- 8-12% reply rate = 4-10 replies
- 1-2 discovery calls booked per week
- 1-2 new customers per month

## Files

- Enrichment script: /Users/johncunningham/one-click-coaching-website/outreach/enrich-leads.py
- LinkedIn tracker sync: /Users/johncunningham/one-click-coaching-website/outreach/sync-linkedin-tracker.py
- Instantly campaign: /Users/johncunningham/one-click-coaching-website/outreach/instantly-campaign.md
- Tech stack research: /Users/johncunningham/occ-outreach-tech-stack-2026.md
- Master GTM plan: /Users/johncunningham/occ-master-gtm-plan-2026.md
- Outreach frameworks: ~/.hermes/skills/occ-cmo/references/outreach.md

## LinkedIn Tracker Integration

Your Google Sheet lives at:
https://docs.google.com/spreadsheets/d/13Qo3tZvlWBYnoPWn7-m7sBbBPVeLEfDYVLmK-0SlleQ/edit

Weekly cron (Mondays 8am): checks for accepted connections with Follow-Up Sent = No and flags them for the email pipeline.

On-demand:
```
cd ~/one-click-coaching-website/outreach
python3 sync-linkedin-tracker.py           # Show ready leads
python3 sync-linkedin-tracker.py --export  # Export to CSV
```
