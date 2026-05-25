# OCC Outreach — Step-by-Step Process Guide

Print this. Follow it. Each step takes minutes.

## Daily Activity Scoreboard

Google Sheet:
https://docs.google.com/spreadsheets/d/1tXnqwo_yKwdVEH7C6sFZVp3YOj2uKdUjzdxiT1ABXh0/edit

Daily goals:
- 20 connection requests
- 5 connections made / accepted
- 5 thoughtful LinkedIn comments
- 60 emails/day only after Instantly warmup is complete
- discovery calls booked/completed
- sales/orders
- LinkedIn posts and blog posts

Point goal: 100/day.
Confetti appears when the day hits goal.

Hermes logging script:
`/Users/johncunningham/one-click-coaching-website/outreach/log-daily-activity.py`

Example:
`python3 log-daily-activity.py --requests 20 --connections-made 5 --comments 5 --linkedin-posts 1 --notes "First Ontario batch"`

## Prospect Deduplication Rule

One source of truth:
`/Users/johncunningham/one-click-coaching-website/outreach/prospect-ledger.csv`

Before any new list goes to enrichment or Instantly, run it through the dedupe script:

`python3 /Users/johncunningham/one-click-coaching-website/outreach/dedupe-prospects.py /path/to/new-evaboot-export.csv --batch-name "Batch name"`

Outputs:
- New prospects only: `/Users/johncunningham/one-click-coaching-website/outreach/deduped/`
- Duplicates report: `/Users/johncunningham/one-click-coaching-website/outreach/deduped/`
- Updated master ledger: `/Users/johncunningham/one-click-coaching-website/outreach/prospect-ledger.csv`

Do not upload raw Sales Nav/Evaboot exports directly to Instantly. Dedupe first.

---

## PHASE 1: WARMUP (Now - June 7)

### STEP 0: Instantly Inbox Recovery Check
Time: 10 minutes, one-time if inboxes seem missing

If Instantly shows no inboxes, check in this order:

1. Workspace/account check
   - Confirm you are logged into the right Instantly workspace.
   - Instantly can show an empty account if you are in the wrong workspace or using a different login.

2. Go to Accounts / Email Accounts, not Campaigns
   - Campaign screens can look empty even when inboxes exist.
   - The inboxes live under Email Accounts / Accounts.

3. Check warmup tab
   - If inboxes were only added to warmup, they may appear under Warmup / Accounts rather than inside a campaign.

4. DNS vs inbox connection
   - DNS being correct does NOT mean the inbox is connected.
   - SPF/DKIM/DMARC live at the domain/DNS level.
   - The actual mailbox still has to be connected through Google/Microsoft SMTP or OAuth.

5. Reconnect if needed
   - Add each mailbox again.
   - Run Instantly's account health check.
   - Confirm status = connected / warmup active.
   - Do not send campaigns yet. Warmup only.

If still missing after these steps, take a screenshot of Instantly's Accounts page and ask Hermes: "read this Instantly screen."

### STEP 1: Verify technical setup
Time: 5 minutes, one-time

- [ ] Inboxes visible in Instantly Accounts / Email Accounts
- [ ] Warmup active for each inbox
- [ ] Check SPF record: https://mxtoolbox.com/spf.aspx
- [ ] Check DKIM: in Google Admin → Apps → Gmail → Authenticate email
- [ ] Check DMARC: https://mxtoolbox.com/dmarc.aspx
- [ ] Configure custom tracking domain in Instantly
- [ ] Set up Google Postmaster Tools for both domains

### STEP 2: Build LinkedIn connections
Time: 15 min/day

- [ ] Sales Nav search: VP Sales, Sales Directors, 20-200 person companies, "Sandler" or "sales training" keywords
- [ ] Send 5-10 personalized connection requests/day
- [ ] Log every request in your LinkedIn Tracker sheet
- [ ] When accepted: update Status to "Accepted" in tracker

### STEP 3: Build content presence
Time: 15 min, 3x/week

- [ ] Post LinkedIn: 3x/week — training drift, coaching reinforcement, Sandler
- [ ] Comment on 5 prospect posts/day — value add, not pitch
- [ ] Your posts warm your inboxes too (prospects recognize the name)

Do NOT send cold email during this phase. Just connections + content.

---

## PHASE 2: PREPARE (June 1-7)

### STEP 4: Export qualified leads
Time: 5 minutes

When your tracker has 20+ accepted connections with Follow-Up Sent = No:

cd ~/one-click-coaching-website/outreach
python3 sync-linkedin-tracker.py --export

This creates linkedin-qualified-leads.csv

### STEP 5: Enrich with icebreakers
Time: 2 minutes + 5 min runtime

python3 enrich-leads.py linkedin-qualified-leads.csv

For each lead, this:
- Scrapes their company website
- Generates a personalized icebreaker
- Outputs linkedin-qualified-leads_enriched.csv

### STEP 6: Review icebreakers
Time: 10 minutes

- [ ] Open the enriched CSV
- [ ] Read each icebreaker — does it sound like research was done?
- [ ] Edit anything that feels generic
- [ ] Delete any leads where you don't have a real angle

### STEP 7: Segment and load into Instantly
Time: 10 minutes

- [ ] Separate leads by type:
  - "Sandler" in profile → Sequence A (Sandler Bridge)
  - All others → Sequence B (The Gap)
- [ ] Upload each segment to Instantly as a separate campaign
- [ ] Map fields: firstName, lastName, email, company, icebreaker
- [ ] Schedule send start: June 8

---

## PHASE 3: SEND (June 8 onward)

### STEP 8: Launch first campaign
Time: 2 minutes

- [ ] In Instantly, activate Sequence A and Sequence B campaigns
- [ ] Start: 20 emails/day/domain for first week
- [ ] Week 2: increase to 30/day/domain if deliverability looks clean

### STEP 9: Daily reply check
Time: 10 min/day, every morning

- [ ] Open Instantly
- [ ] Check replies
- [ ] Positive reply → respond within 2 hours. Book discovery call.
- [ ] "Not interested" → note reason. Update targeting if pattern emerges.
- [ ] Questions → answer clearly. End with call to action.

### STEP 10: Handle LinkedIn replies
Time: 5-10 min per reply

Replies from InMail or connection requests come through Sales Navigator Messaging (top menu bar), NOT regular LinkedIn messaging.

**Finding the reply:**
- [ ] Sales Navigator → Messaging (top menu bar)
- [ ] Click the conversation row (single click on the name, not the preview text)
- [ ] Full message loads in the main panel. If preview is truncated and won't expand, the conversation needs to be selected — the full text appears in the main reading pane, not the sidebar.

**Drafting the reply:**
- [ ] Paste the prospect's message into Hermes chat
- [ ] Hermes drafts a reply that bridges naturally to your value prop — no hard pitch, just conversation
- [ ] Review and approve the draft

**Saving the reply:**
- [ ] Ask Hermes: "make it into a PDF"
- [ ] Standard format: dark blue banner, today's date, Helvetica 17pt, 1.5 line spacing
- [ ] Hermes uploads to Google Drive automatically
- [ ] Manual command if needed: `python3 ~/.hermes/skills/productivity/google-workspace/scripts/google_api.py drive upload "/Users/johncunningham/Desktop/[Name]-Reply-[Date].pdf"`

**Updating records:**
- [ ] Hermes updates the daily CSV tracker (Status → Connected, accepted date)
- [ ] Hermes updates the daily counter (connections_made)
- [ ] Confirm both are done

**Sending:**
- [ ] Copy the final draft from the PDF
- [ ] Paste into Sales Navigator Messaging
- [ ] Do NOT send directly from Hermes — always review the draft first

**For Phase 3 multi-channel touch:**
- [ ] After email 2 sends (Day 4-5): view the prospect's LinkedIn profile
- [ ] Like or comment on a recent post
- [ ] Do NOT pitch in the comment — just be visible
- [ ] If they engage back: that's a warm signal. Move to priority.

### STEP 11: Weekly review
Time: 15 min, every Monday

- [ ] Reply rate: target 5-8%. Below 3% → rework subject lines or icebreakers
- [ ] Bounce rate: must stay below 2%. Above 2% → re-verify list
- [ ] Spam rate: must stay below 0.3%. Check Google Postmaster Tools
- [ ] Booked discovery calls: target 2-4/month from cold outreach
- [ ] Update LinkedIn tracker: mark Follow-Up Sent = Yes for sent leads

---

## WHAT NOT TO DO

- Do NOT send from oneclickcoaching.com. Use secondary domains only.
- Do NOT add images, links, or calendly to email 1. Plain text only.
- Do NOT send "just checking in" or "bumping this up." Every email adds value.
- Do NOT skip email verification. One bad list kills deliverability for months.
- Do NOT send more than 30/day/domain in month 1. Ramp slowly.
- Do NOT send to catch-all emails. MillionVerifier marks these — skip them.
- Do NOT pitch in LinkedIn comments. Add value only. Let them come to you.

---

## FILE REFERENCE

- LinkedIn Tracker: https://docs.google.com/spreadsheets/d/13Qo3tZvlWBYnoPWn7-m7sBbBPVeLEfDYVLmK-0SlleQ/edit
- Sync script: ~/one-click-coaching-website/outreach/sync-linkedin-tracker.py
- Enrich script: ~/one-click-coaching-website/outreach/enrich-leads.py
- Campaign template: ~/one-click-coaching-website/outreach/instantly-campaign.md
- Full pipeline readme: ~/one-click-coaching-website/outreach/README.md

## QUICK COMMANDS

Check ready leads:
  python3 sync-linkedin-tracker.py

Export + enrich:
  python3 sync-linkedin-tracker.py --export
  python3 enrich-leads.py linkedin-qualified-leads.csv

Show my weekly report (advisor):
  say "give me my weekly advisor report" in Telegram
