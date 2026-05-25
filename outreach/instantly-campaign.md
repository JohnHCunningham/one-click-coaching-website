# OCC Outreach Campaign — Instantly Setup

## Timeline

- May 18 - Jun 7: Email warmup only. Build + enrich lead lists.
- Jun 8: First campaign sends begin.

## Sending Rules

- 2 sending domains, 30 emails/day each = 60 max/day
- Start at 20/day/domain for first week, ramp to 30
- Only reply tracking (no open pixels — Google blocks them in 2026)
- 4-email sequence, staggered across 14 days per lead

## Campaign Sequences

### SEQUENCE A: The Sandler Bridge (Sandler-trained prospects)

Use for leads with "Sandler" in profile, company, or from Sandler-related searches.

EMAIL 1 — Day 1
Subject: Sandler installs it. This runs the diagnostics.
```
{{firstName}} —

{{icebreaker}}

If your team is running Sandler, the methodology is installed. The question is whether it's showing up on every call, with every rep, consistently — or just in the training room.

Worth 20 minutes to see how that gap gets closed automatically?

John Cunningham
One Click Coaching

PS — Scoring 8 Sandler components per call. No deck, no demo pressure.
```

EMAIL 2 — Day 4
Subject: 72 hours.
```
{{firstName}} —

Most sales training has a half-life of 72 hours. Your reps understood the Up-Front Contract in the training room. The question is whether they're setting it on Monday morning.

That's not a training problem. It's a reinforcement problem. And it's solvable.

Happy to show you the scoring output if you want to see it live.

John
```

EMAIL 3 — Day 9
Subject: Your managers already know
```
{{firstName}} —

Your managers can feel the drift. They just can't prove it — not without listening to 15 hours of calls a week.

One Click Coaching scores every call against the 8 Sandler components automatically. Managers approve in one click.

What would it be worth to stop guessing and start knowing?

John
```

EMAIL 4 — Day 14
Subject: —
```
{{firstName}} — I've sent a few notes. No response usually means one of three things: wrong timing, wrong problem, or wrong person.

If it's timing — happy to reconnect next quarter.
If it's the wrong problem — curious what's top of mind for the team right now.
If I've got the wrong person — who should I be talking to?

John
```

---

### SEQUENCE B: The Gap (Non-Sandler, methodology-trained prospects)

Use for leads with Challenger, MEDDIC, SPIN, Gap Selling, or general "sales training" in profile.

EMAIL 1 — Day 1
Subject: Your training ROI problem
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

EMAIL 2 — Day 4
Subject: 37 calls. One pattern.
```
{{firstName}} —

We scored 37 calls from a team similar to {{company}}'s size, trained in a defined methodology. The average gap between what the methodology requires and what actually happened on the call was 40%.

Not because the reps didn't care. Not because the training was wrong. Because pressure reveals habit, not intention.

That gap is costing you pipeline. The fix is faster than you think.

John
```

EMAIL 3 — Day 9
Subject: What happens between sessions
```
{{firstName}} —

Sales training happens in a room. Sales execution happens on a call, under pressure, a week later.

Everything that happens between those two moments — that's where the training investment is won or lost. Most teams have nothing in that gap. No reinforcement. No measurement. No accountability.

One Click Coaching fills that gap. Automatically.

John
```

EMAIL 4 — Day 14
Subject: —
```
{{firstName}} — I've sent a few notes. No response usually means one of three things: wrong timing, wrong problem, or wrong person.

If it's timing — happy to reconnect next quarter.
If it's the wrong problem — curious what's top of mind.
If I've got the wrong person — who should I talk to?

John
```

---

## Spintax Variations (use in Instantly for subject lines)

Use spintax to vary subject lines across sends and avoid spam filters.

Email 1 subject spintax:
{Sandler installs it. This runs the diagnostics.|Your training ROI problem|What Gong can't measure|The gap between sessions}

Email 2 subject spintax:
{72 hours.|37 calls. One pattern.|What the data actually shows|Your managers can't see this}

Email 3 subject spintax:
{Your managers already know|What happens between sessions|The rep you're about to lose|Stop guessing. Start knowing.}

## Campaign Settings in Instantly

- Daily send limit: start 20/domain, ramp to 30 after 1 week
- Time between emails: 60-180 seconds (randomized)
- Send windows: 8am-6pm recipient time zone
- Weekdays only
- Smart sending: ON (distributes across time zones)
- Reply tracking: ON
- Open tracking: OFF (Google pre-fetches, data useless, triggers spam)
- Link tracking: OFF (adds redirect, hurts deliverability)

## Pre-Send Checklist

Before Jun 8 launch:
- [ ] Warmup on both domains: 21+ days completed
- [ ] SPF, DKIM, DMARC verified on both domains
- [ ] 50-80 leads enriched with icebreakers
- [ ] Leads segmented: Sandler-trained (Sequence A) vs other (Sequence B)
- [ ] Custom tracking domain configured
- [ ] Google Postmaster Tools set up for both domains (monitor spam rate)
- [ ] Reply handling process: John checks Instantly daily at 9am
