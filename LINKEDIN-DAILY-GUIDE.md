# LinkedIn Daily Operating Guide

One page. All LinkedIn workflows. Never miss a step.

---

## Morning Routine (When You Start)

1. Check for accepted connections overnight
   - If any: I'll draft follow-up messages within 24 hours
   - You send them

2. Review yesterday's pending CSV
   - `/Users/johncunningham/one-click-coaching-website/outreach/linkedin-connections-YYYY-MM-DD.csv`

3. Decide: outreach session this morning or afternoon? How many requests?

---

## Profile Posts (Tue/Wed/Thu — Automated)

**What happens:** Cron job drafts a post at 9 AM. I deliver it to you.

**What you do:**
1. Review the draft
2. Post it to your profile feed (Buffer or directly)
3. Post the group version to the day's group:
   - **Tue:** Same text → Linking Sales Leaders
   - **Wed:** Sandler-modified version → Sandler Sales Training
   - **Thu:** Challenger-modified version → The Challenger Sale
4. Tell me: "posted" — I log both counters

**Counters updated:** group_posts +1, profile_posts +1 (10 points)

---

## Connection Requests (During Outreach Sessions)

**What I do:**
- Analyze prospect profiles (title, company, industry)
- Suggest V-A or V-B message type
- Draft personalized connection request

**What you do:**
1. Copy message + subject
2. Send via Sales Navigator or LinkedIn
3. Tell me: "sent" — I auto-log counter + CSV

**Counters updated:** requests +1 (2 points)

---

## Connection Acceptances (Anytime)

**What you do:**
1. Tell me: "[Name] accepted — [title], [company]"
2. I draft a follow-up message within 24 hours
3. You send it
4. Tell me: "sent" — I update CSV + counter

**Counters updated:** connections_made +1 (5 points)

---

## Comments (During Browsing)

**What I do:**
- Draft a comment when you find a relevant post
- Use peer-to-peer tone, no pitch

**What you do:**
1. Review
2. Post the comment
3. Tell me: "commented" — I log counter only

**Counters updated:** comments +1 (4 points)

---

## Group Posts (Tue/Wed/Thu — Automated)

Covered under Profile Posts above. Same post goes to both.

**Groups:**
1. Linking Sales Leaders (Tue)
2. Sandler Sales Training (Wed)
3. The Challenger Sale (Thu)

**Angle bank:** `/Users/johncunningham/one-click-coaching-website/content-queue/group-posting-log.md`

---

## Follow-ups

**24-hour rule:** Message accepted connections within 24 hours.

**What I do:** Draft follow-up message with 2-3 relevant questions

**What you do:** Send it. Tell me "sent" — I update CSV.

**Tracking:** `/Users/johncunningham/one-click-coaching-website/outreach/check-followups.py` (cron runs 8 AM daily)

---

## End of Day

1. Tell me: "end of day" — I show final counter
2. Review: connections made today, follow-ups sent, posts completed
3. New CSV created automatically for tomorrow

---

## Quick Commands

| What | Command |
|------|---------|
| Show counter | `python3 daily-counter.py --show` |
| Start session | `python3 daily-counter.py --start-session` |
| End session | `python3 daily-counter.py --end-session` |
| Reset counter | `python3 daily-counter.py --reset` |
| Check follow-ups | `python3 check-followups.py` |

All from: `/Users/johncunningham/one-click-coaching-website/outreach/`

---

## Scoring

| Activity | Points |
|----------|--------|
| Connection request | 2 |
| Comment | 4 |
| Group post | 5 |
| Profile post | 5 |
| Connection made | 5 |
| **Daily goal** | **100** |

---

## Files Reference

| What | Where |
|------|-------|
| Daily CSV | `outreach/linkedin-connections-YYYY-MM-DD.csv` |
| Counter data | `outreach/daily-counter.json` |
| Group posting log + angles | `content-queue/group-posting-log.md` |
| Follow-up scanner | `outreach/check-followups.py` |
| Group post logger | `outreach/log-group-post.py` |
| Daily activity logger | `outreach/log-daily-activity.py` |

---

## Weekly Rhythm

| Day | Profile Post | Group Post |
|-----|-------------|------------|
| Mon | — | — |
| Tue | General | Linking Sales Leaders (same text) |
| Wed | General | Sandler Sales Training (modified) |
| Thu | General | The Challenger Sale (modified) |
| Fri | — | — |

---

**Last updated:** 2026-05-20
