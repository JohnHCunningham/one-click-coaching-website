# OCC Outreach Dashboard

Beautiful, professional dashboard for tracking your 6-month outreach sprint.

## Features

✅ **Quota Tracking**
- 15 deals goal
- 75 reps goal
- $3,750 MRR goal
- Progress bars with percentage
- Pace indicators (ahead/behind)

✅ **Activity Metrics**
- Daily connection requests
- Group comments
- Cold emails sent
- Replies received
- Calls booked & held

✅ **Conversion Funnel**
- Reply rate (emails → replies)
- Call booking rate (replies → calls)
- Close rate (calls → deals)

✅ **Visual Charts**
- Activity trends (line chart)
- Conversion funnel (bar chart)
- Timeline progress

✅ **Milestone Celebrations**
- Confetti animations on achievements
- 50 connections ✨
- First call 📞
- First customer 🚀
- 5, 10, 15 customers 🎉

✅ **OCC Brand Design**
- Espresso, Terracotta, Bone, Clay colors
- Clean, professional aesthetic
- Matches your website

## Setup

### Step 1: Create Google Sheet

Follow instructions in `GOOGLE-SHEETS-SETUP.md`

### Step 2: Open Dashboard

Open `index.html` in your browser or host it online:

**Option A: Local (Quick Test)**
- Double-click `index.html`
- Opens in your browser
- Enter Google Sheet ID

**Option B: GitHub Pages (Recommended)**
```bash
cd /Users/johncunningham/one-click-coaching-website
git add outreach-dashboard/
git commit -m "Add outreach dashboard"
git push origin main
```

Then:
1. Go to GitHub repo settings
2. Enable GitHub Pages
3. Set source to `/outreach-dashboard`
4. Access at: `https://yourusername.github.io/one-click-coaching-website/outreach-dashboard/`

**Option C: Vercel (Best)**
```bash
cd outreach-dashboard
vercel deploy
```

### Step 3: Connect Google Sheet

1. Create Google Sheet (see GOOGLE-SHEETS-SETUP.md)
2. Share sheet → "Anyone with the link can view"
3. Copy Sheet ID from URL
4. Enter in dashboard
5. Click "Connect Dashboard"

### Step 4: Start Tracking

Use the form at the bottom to log daily activity.

## Daily Routine

**Every evening:**
1. Open dashboard
2. Scroll to "Log Today's Activity"
3. Enter your numbers:
   - Connection requests sent
   - Group comments posted
   - Cold emails sent
   - Replies received
   - Calls booked & held
4. Click "Save to Google Sheets"

**Dashboard auto-updates with:**
- Progress toward 15 deals
- Conversion rates
- Pace indicators
- Milestone achievements

## What You'll See

**Quota Progress Cards:**
- Deals: X / 15 (with progress bar)
- Reps: X / 75 (with progress bar)
- MRR: $X / $3,750 (with progress bar)
- Days remaining in sprint

**Activity Summary:**
- Total connections, emails, comments
- Reply rates, booking rates, close rates
- Visual charts showing trends

**Milestones:**
- Checkmarks for achieved milestones
- Confetti celebrations when you hit goals

## Next Steps

Once Google Sheets API is connected (Phase 2):
- Auto-sync with Google Sheets
- Real-time updates
- No manual sheet editing needed
- Dashboard pulls data automatically

For now: Manual entry via form → manual update to Google Sheet.

---

**Questions? Issues?**

See GOOGLE-SHEETS-SETUP.md for detailed sheet structure.
