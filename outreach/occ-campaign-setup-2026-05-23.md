# OCC Campaign Setup — May 23, 2026

## Status: Leads ready, list created, campaign pending manual setup

---

## What's Done

### Lead List (Instantly)
- **List name:** OCC Batch 1 - Ontario VP Sales (May 2026)
- **List ID:** 68b17cbb-a153-400a-be76-7bdd62b1165e
- **CSV file:** `outreach/occ-batch1-instantly-2026-05-23.csv`
- **21 prospects** (22 minus Nathaniel G — Marketing, not Sales)

### Icebreakers
All 21 have personalized icebreakers. Each references:
- Their specific company/industry
- Why their sales motion is vulnerable to training drift
- No generic "noticed your company is a leader in..." language

### Segmentation
All 21 → **Sequence B (The Gap)**
None mention Sandler in profile, company, or search source.

---

## What You Need To Do (5 minutes)

### Step 1: Upload CSV to List
1. Go to https://app.instantly.ai → Lead Lists
2. Click "OCC Batch 1 - Ontario VP Sales (May 2026)"
3. Import → upload `outreach/occ-batch1-instantly-2026-05-23.csv`
4. Map columns:
   - email → Email
   - firstName → First Name
   - lastName → Last Name
   - company → Company
   - icebreaker → Custom field (create if needed)

### Step 2: Create Campaign
Create a new campaign with these settings:

**Basic:**
- Name: `OCC Sequence B — The Gap (Ontario VP Sales)`
- Accounts: johnc@occ-sales.com
- Lead list: OCC Batch 1 - Ontario VP Sales (May 2026)

**Schedule:**
- Start date: June 8, 2026
- Days: Mon–Fri
- Hours: 8:00 AM – 6:00 PM recipient timezone
- Time between emails: 60–180 seconds (randomized)

**Tracking:**
- Reply tracking: ON
- Open tracking: OFF
- Link tracking: OFF

**Sending:**
- Daily limit: 20 per account (start conservative, ramp to 30 after week 1)
- Smart sending: ON (distributes across timezones)

### Step 3: Add Email Sequence
Create these 4 steps. Use `{{firstName}}`, `{{icebreaker}}`, `{{company}}` as merge fields.

#### EMAIL 1 — Day 1
Subject spintax:
```
{Your training ROI problem|The gap between sessions|What Gong can't measure|The number your CRM won't show you}
```

Body:
```
{{firstName}} —

{{icebreaker}}

Your team completed real sales training. Not a webinar. Not a book. The real thing. But execution decays the moment the workshop ends — and most of that investment erodes inside 90 days.

That gap has a number. For a 10-rep team at $800K quota, it's roughly $240K in lost pipeline per quarter.

Worth 20 minutes to see what closing that gap looks like?

John Cunningham
One Click Coaching

PS — No deck, no demo pressure. Just a conversation about what's happening on your calls.
```

#### EMAIL 2 — Day 4
Subject spintax:
```
{37 calls. One pattern.|What the data actually shows|Your managers can't see this|72 hours.}
```

Body:
```
{{firstName}} —

We scored 37 calls from a team similar to {{company}}'s size, trained in a defined methodology. The average gap between what the methodology requires and what actually happened on the call was 40%.

Not because the reps didn't care. Not because the training was wrong. Because pressure reveals habit, not intention.

That gap is costing you pipeline. The fix is faster than you think.

John
```

#### EMAIL 3 — Day 9
Subject spintax:
```
{What happens between sessions|Stop guessing. Start knowing.|The rep you're about to lose|Your managers already know}
```

Body:
```
{{firstName}} —

Sales training happens in a room. Sales execution happens on a call, under pressure, a week later.

Everything that happens between those two moments — that's where the training investment is won or lost. Most teams have nothing in that gap. No reinforcement. No measurement. No accountability.

One Click Coaching fills that gap. Automatically.

John
```

#### EMAIL 4 — Day 14
Subject: (leave blank — breakup email)

Body:
```
{{firstName}} — I've sent a few notes. No response usually means one of three things: wrong timing, wrong problem, or wrong person.

If it's timing — happy to reconnect next quarter.
If it's the wrong problem — curious what's top of mind.
If I've got the wrong person — who should I talk to?

John
```

---

## Pre-Send Checklist (Before June 8)

- [ ] Warmup on johnc@occ-sales.com: 21+ days completed (started May 18 → 21 days = June 8 ✓)
- [ ] SPF, DKIM, DMARC verified on sending domain
- [ ] Google Postmaster Tools set up for occ-sales.com (monitor spam rate)
- [ ] Leads uploaded to list
- [ ] Campaign created with 4-step sequence
- [ ] Campaign set to PAUSED until June 8
- [ ] Reply handling: John checks Instantly daily at 9 AM

---

## Accounts Status (3 warming)

| Email | Warmup | Started |
|-------|--------|---------|
| johnc@occ-sales.com | Active (100) | May 18 |
| john.cunningham@occ-sales.com | Active (100) | — |
| john@occ-sales.com | Active (100) | — |

Consider adding all 3 to the campaign once volume justifies it (60/day total at 20/account).

---

## API Patterns Discovered (for future automation)

### Creating leads (works):
```
POST /api/v2/leads
{"email": "...", "first_name": "...", "last_name": "..."}
```
Note: flat object, NOT wrapped in "leads" array.

### Deleting leads (works):
```
DELETE /api/v2/leads/{id}
```
No Content-Type header, no body.

### Adding leads to list (BLOCKED):
The API rejects all list-association formats tried. Workaround: web UI upload.

### Campaign creation (PARTIAL):
Schema requires `campaign_schedule.schedules[].timezone` but valid timezone values are unknown. 19 formats tried, none accepted.
