# OCC Outreach Dashboard - Google Sheets Setup

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet
3. Name it: **"OCC Outreach Tracker - 2026"**
4. Create the following sheets (tabs):

---

## Sheet 1: Daily Activity

**Column headers (Row 1):**

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Date | Connections Sent | Group Comments | Emails Sent | Replies Received | Calls Booked | Calls Held | Deals Closed |

**Instructions:**
- Enter date in format: 2026-05-12
- Enter numbers for each activity
- Leave blank if zero (dashboard will count as zero)

**Example Row 2:**
```
2026-05-12 | 10 | 5 | 10 | 2 | 1 | 0 | 0
```

---

## Sheet 2: Deals Pipeline

**Column headers (Row 1):**

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Company Name | Contact Name | # of Reps | Stage | Close Date | MRR | Notes |

**Stage values:**
- Discovery
- Demo Scheduled
- Demo Complete
- Proposal Sent
- Negotiation
- Closed Won
- Closed Lost

**Example Row 2:**
```
Acme Corp | Jane Smith | 5 | Demo Complete | 2026-05-20 | 250 | Sandler team, warm lead
```

**MRR Calculation:**
- Formula in column F: `=C2*50`
- (# of Reps × $50)

---

## Sheet 3: Goals

**Setup:**

| A | B |
|---|---|
| **Goal** | **Value** |
| Start Date | 2026-05-12 |
| End Date | 2026-11-11 |
| Days Total | 183 |
| Target Deals | 15 |
| Target Reps | 75 |
| Target MRR | 3750 |
| Price Per Seat | 50 |
| Avg Reps Per Customer | 5 |

**Formula for B4 (Days Total):**
```
=DAYS(B3,B2)
```

---

## Sheet 4: Summary (Calculations)

**This sheet auto-calculates from your data**

### Activity Summary

| Metric | Formula | Cell |
|--------|---------|------|
| Total Connections Sent | `=SUM('Daily Activity'!B:B)` | B2 |
| Total Group Comments | `=SUM('Daily Activity'!C:C)` | B3 |
| Total Emails Sent | `=SUM('Daily Activity'!D:D)` | B4 |
| Total Replies Received | `=SUM('Daily Activity'!E:E)` | B5 |
| Total Calls Booked | `=SUM('Daily Activity'!F:F)` | B6 |
| Total Calls Held | `=SUM('Daily Activity'!G:G)` | B7 |
| Total Deals Closed | `=COUNTIF('Deals Pipeline'!D:D,"Closed Won")` | B8 |

### Conversion Rates

| Metric | Formula | Cell |
|--------|---------|------|
| Reply Rate | `=B5/B4` | B10 |
| Call Booking Rate | `=B6/B5` | B11 |
| Call to Deal Rate | `=B8/B7` | B12 |

### Revenue Metrics

| Metric | Formula | Cell |
|--------|---------|------|
| Current MRR | `=SUMIF('Deals Pipeline'!D:D,"Closed Won",'Deals Pipeline'!F:F)` | B14 |
| Total Reps | `=SUMIF('Deals Pipeline'!D:D,"Closed Won",'Deals Pipeline'!C:C)` | B15 |
| Deals Closed | `=COUNTIF('Deals Pipeline'!D:D,"Closed Won")` | B16 |

### Quota Progress

| Metric | Formula | Cell |
|--------|---------|------|
| Days Elapsed | `=DAYS(TODAY(),Goals!B2)` | B18 |
| Days Remaining | `=Goals!B4-B18` | B19 |
| % Time Elapsed | `=B18/Goals!B4` | B20 |
| Deals Progress % | `=B16/Goals!B5` | B21 |
| MRR Progress % | `=B14/Goals!B7` | B22 |
| On Track Pace | `=IF(B21>=B20,"Ahead","Behind")` | B23 |

---

## Sheet 5: Weekly Summary (Optional)

**Automatically groups daily activity by week**

Use pivot table or formulas to show:
- Week starting date
- Total activity for that week
- Conversions
- Deals closed

---

## Publishing for Dashboard Access

**Option 1: Public (anyone with link)**
1. File → Share → Get link
2. Change to "Anyone with the link can view"
3. Copy the sheet ID from URL
4. Use in dashboard

**Option 2: Private (service account)**
1. Create Google Cloud Project
2. Enable Google Sheets API
3. Create service account
4. Share sheet with service account email
5. More secure but more setup

**For now, use Option 1** (we can upgrade to Option 2 later if needed)

---

## Next Step

Once you create the Google Sheet with these tabs:
1. Share the link with me
2. I'll build the web dashboard that reads from it
3. Dashboard will auto-update as you enter data

**Create it now and share the link?**
