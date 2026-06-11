# LinkedIn Outreach SOP — Canonical Process

**Date:** June 1, 2026
**Owner:** John Cunningham
**Purpose:** One process, one naming convention, zero drift between Sales Nav and delivered notes.

---

## THE THREE SIGNALS

Every list John builds falls into exactly one category:

| Signal | Degree | Action | Subject Line? | Tool |
|--------|--------|--------|---------------|------|
| **Notes** | 2nd | Connection request + note | No | Sales Nav → LinkedIn |
| **InMail** | 3rd | InMail message | **Yes** (required) | Sales Nav → LinkedIn |
| **Email** | Any | Email outreach | N/A | Instantly |

John decides which signal BEFORE exporting from Sales Nav.

---

## LIST NAMING CONVENTION (NON-NEGOTIABLE)

Every list follows this exact format:

```
[signal]-[YYYY-MM-DD]-[page]of[total]
```

Examples:
- `notes-2026-05-29-1of3`
- `notes-2026-05-29-2of3`
- `inmail-2026-05-30-1of2`
- `email-2026-06-01-1of1`

**Rules:**
- Use hyphens, not underscores
- Date is always YYYY-MM-DD
- Page format is `1of3` not `1/3` or `1_3`
- This name is the Sales Nav list name, the CSV export filename, and the final HTML form name. **It never changes.**

---

## STEP-BY-STEP PROCESS

### 1. John: Build the Sales Nav search
- Run the search in Sales Navigator
- Determine signal type (Notes, InMail, or Email)
- Save as a Sales Nav list using the naming convention above

### 2. John: Export from Sales Nav
- Open the saved list
- Export to CSV
- Rename the downloaded CSV to match the list name exactly
  - Example: `notes-2026-05-29-1of3.csv`
- If the search spans multiple pages, export each page as a separate CSV
  - `notes-2026-05-29-1of3.csv`, `notes-2026-05-29-2of3.csv`, `notes-2026-05-29-3of3.csv`

### 3. John: Hand to Claude for processing
- Upload CSV(s) to Claude
- **Critical:** The Claude prompt must include: "Preserve the original filename as the batch identifier. Do not rename or reformat the source name."
- Claude returns markdown with personalized connection notes
- For InMail lists: Claude MUST include subject lines on every note

### 4. John: Hand Claude's output to Hermes
- Paste Claude's markdown output to Hermes
- Hermes builds an HTML form with:
  - The **original Sales Nav list name** as the header
  - Copy-paste buttons for each note
  - For InMail: subject line + body
  - Page/source reference so John knows which SN list to open

### 5. Hermes: Generate HTML form
- Output file named to match the source list: `connection-notes-2026-05-29-1of3.html`
- Saved to `/Users/johncunningham/one-click-coaching-website/outreach/`
- Each card includes: name, company, role, personalized note, character count

### 6. John: Execute from Sales Nav
- Open the corresponding Sales Nav list by name
- Work down the list, copying notes from the HTML form
- Check off each contact as sent

---

## NAMING GUARDRAILS

**The canonical name is set at Step 1 and never changes.**

If Claude or Hermes renames the output, it MUST be corrected back to the original list name before John uses it.

If a name mismatch is discovered mid-execution (like June 1: `notes-05_29_26-1_1` vs `notes-05-29-26-2of3`), flag it immediately. Do not proceed until the correct list is identified.

---

## INMAIL-SPECIFIC NOTES

- InMail requires a subject line (Notes do not)
- InMail credits are limited — use sparingly
- John burned all InMail credits in May 2026; renewal date TBD
- When InMail credits are exhausted, 3rd-degree contacts should be routed to Email (Instantly) or saved for later

---

## INSTANTLY

- Email lists go to Instantly for automated outreach
- Instantly warmup: started May 18, ready June 7, 2026
- 3 occ-sales.com inboxes warming
- Ramp-up strategy: reputation first, not max volume

---

## FILE LOCATIONS

| What | Where |
|------|-------|
| CSVs (raw exports) | `/Users/johncunningham/Downloads/` |
| HTML forms (ready to use) | `/Users/johncunningham/one-click-coaching-website/outreach/` |
| LEDGER (daily tracking) | `/Users/johncunningham/one-click-coaching-website/outreach/LEDGER.md` |
| Daily counter (scorecard) | `/Users/johncunningham/one-click-coaching-website/outreach/daily-counter.json` |

---

## REVISION HISTORY

- June 1, 2026 — Created from hard-learned lesson: underscore vs hyphen naming drift broke traceability between SN lists and HTML forms
