# LinkedIn Outreach — Claude Instructions

## Signal Types (READ FIRST)

Before processing any CSV, identify the signal type from the filename:

| Signal | Degree | Action | Subject Line? | Filename Prefix |
|--------|--------|--------|---------------|-----------------|
| **Notes** | 2nd | Connection request + note | **No** | `notes-` |
| **InMail** | 3rd | InMail message | **Yes** (required) | `inmail-` |
| **Email** | Any | Email outreach | N/A | `email-` |

The filename tells you everything. `notes-2026-05-29-1of3.csv` = Notes signal, no subject lines. `inmail-2026-05-30-1of2.csv` = InMail signal, subject lines required.

## Hard Rules

- 300 characters MAX. Verify with a char count before finalizing.
- Notes (2nd-degree): No subject line. No sign-off (no "Best," "Regards," "John").
- InMail (3rd-degree): Subject line REQUIRED. Keep it under 40 chars. Still no sign-off.
- Every note must prove you read their profile. Generic = rewrite.
- Industry language: "advisors" for financial services, "reps" for B2B SaaS, "consultants" for professional services.
- New in role (≤4 months)? Lean into the evaluation-mode angle — they're assessing the team.
- Never mention One Click Coaching. Never pitch. Never ask for a call.
- Shorter is better. 200 chars and personal beats 290 chars and crafty.

## Naming Preservation (NON-NEGOTIABLE)

**The original Sales Nav list name is the canonical name. It must not change.**

- Read the CSV filename. That IS the batch identifier.
- Output the batch name exactly as received in your response header.
- Example: if the file is `notes-2026-05-29-1of3.csv`, your output header says "Source: notes-2026-05-29-1of3"
- Do not convert hyphens to underscores. Do not renumber. Do not reformat the date.
- John uses this name to find the matching Sales Nav list. If the name drifts, the list can't be found.

## Output Format

Your response must include:

```
## Batch: [EXACT CSV FILENAME]
## Signal: [Notes / InMail / Email]
## Profiles: [total] → [SEND count] SEND / [SKIP count] SKIP

### SEND
1. **Full Name** — Title · Company · Industry · Location
   [For Notes]: Connection note text (no subject line)
   [For InMail]: **Subject:** [subject line]
   Body text
   [char count]

### SKIP (brief reason for each)
- Name — Reason (no profile data, irrelevant industry, etc.)
```

Keep the markdown clean. John pastes this directly to Hermes for HTML form generation.

## CSV Parsing Notes

File is UTF-16 encoded, tab-delimited, with quoted fields.
Parse with: `open(file, encoding='utf-16')` then split on `\n`, use `csv.reader` with `delimiter='\t'`.
Key fields: First Name, Last Name, Current Job, Company Name, Company Industry,
Company Employee Range, Sales Team Size, Months in Position, Profile Headline, Profile Summary.

## Who To Send vs Skip

**SEND** if ALL of these are true:
- Decision-maker or influencer in sales (VP Sales, Sales Manager, Head of Sales, CRO, Sales Enablement)
- Company has 5-200 employees (sweet spot for coaching)
- Profile has enough detail to write a personalized note
- Open profile (not locked/private)

**SKIP** if ANY of these are true:
- No sales leadership responsibility
- Company < 5 employees (likely solo founder) or > 1000 (enterprise, wrong buyer)
- Profile is locked, empty, or has no company info
- Already connected
- Non-English profile (unless in Canada/UK/Australia)
- Obvious competitor (sales training/coaching company)
