# One Click Coaching: Product Specification

> **Mission:** Prevent methodology drift by reinforcing Sandler training before, during, and after every sales call.

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [The 4 Core Components](#the-4-core-components)
3. [User Flows](#user-flows)
4. [Technical Architecture](#technical-architecture)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Pricing & Packaging](#pricing--packaging)

---

## Product Overview

### The Problem

Sales leaders invest $10-20k per rep in methodology training (Sandler, MEDDIC, Challenger, etc.). Within 90 days, reps revert to old habits because there's no systematic reinforcement.

**Result:** Training ROI = $0. Deals stall. Close rates don't improve.

### The Solution: OCC Anti-Drift Loop™

One Click Coaching prevents methodology drift with a 4-part system:

1. **Training Materials** - Reps learn the methodology
2. **Sales Copilot** - Real-time guidance DURING calls
3. **Call Scoring** - Scores every call against methodology (0-100)
4. **Same-Day Coaching** - Delivers coaching within hours, not weeks

### Why This Works

Traditional coaching is **too slow** (weeks later) and **too manual** (manager has to listen to every call).

OCC is **immediate** (same-day) and **systematic** (scores every call, not a random sample).

---

## The 4 Core Components

### Component 1: Training Materials

**Purpose:** Onboard reps to Sandler methodology

**What it includes:**
- The 7 Submarine compartments (detailed guide)
- Quick reference cards (Pain Funnel, Reversing, Up-Front Contract)
- Role play scenarios
- Manager playbook
- Self-assessment tool

**User:** Sales reps (learning) + Managers (teaching)

**File:** `occ-training-materials.md`

**Delivery:** PDF download + web portal

---

### Component 2: Sales Copilot (Real-Time Assistant)

**Purpose:** Help reps execute Sandler DURING calls

**What it does:**
Reps ask questions via chat/Slack/Chrome extension and get instant Sandler guidance.

**Example interactions:**

```
Rep: "Give me pain funnel questions"

Copilot: "Here's a micro pain funnel you can use right now:
1. 'Can you tell me more about that?'
2. 'How long has that been going on?'
3. 'What does that cost in terms of deals or revenue?'
4. 'How does that affect you personally?'
5. 'What happens if nothing changes?'

Paste what they just said and I'll suggest the next 2 questions."
```

```
Rep: "They just asked for pricing but we're only 3 minutes in"

Copilot: "Sandler-style reverse:

'Great question. It varies depending on what we're solving for.
Would it be okay if I ask a few more questions about [their pain]
so I can give you a range that's actually meaningful?'

Don't spill your candy in the lobby!"
```

**9 Intent Categories:**
1. Rapport & contract setup
2. Explore pain
3. Handle budget question early
4. Clarify decision process
5. Respond to proposal request too early
6. Handle stall or "think it over"
7. Handle price pushback
8. Qualify out / no fit
9. Close for next step

**User:** Sales reps (during prospecting calls)

**File:** The JSON you just showed me (sales-copilot-intents.json)

**Delivery Options:**
- **Option A:** Slack bot (rep messages @occ-copilot during call)
- **Option B:** Chrome extension (sidebar during Zoom/Google Meet)
- **Option C:** Web app (second monitor during calls)
- **Option D:** Mobile app (phone on desk during calls)

**Recommended:** Start with Slack bot (easiest to build, fastest adoption)

---

### Component 3: Call Scoring Engine

**Purpose:** Score every call against Sandler methodology (0-100)

**How it works:**
1. Call recording from Gong/Chorus/Zoom → OCC
2. Transcript analyzed against 7 Submarine compartments
3. Score calculated:
   - Bonding & Rapport: 10 pts
   - Up-Front Contract: 15 pts
   - Pain (Pain Funnel): 25 pts
   - Budget: 15 pts
   - Decision: 15 pts
   - Fulfillment: 10 pts
   - Post-Sell: 10 pts
   - **Total: 100 pts**

4. Anti-patterns detected (e.g., "spilled candy in lobby" = -15 pts)
5. Social layer bonuses (e.g., used Pendulum technique = +3 pts)

**Detects:**
- Which compartments were covered
- How deep the Pain Funnel went (1-7 levels)
- Whether rep reversed pricing questions
- If rep assumed they were the decision maker
- Tonality issues (desperate, interrogating, etc.)

**User:** System (automated) → Generates coaching for reps + reports for managers

**File:** `occ-call-scoring-schema.json`

**Integration:** Gong API, Chorus API, Zoom API, or upload MP3/transcript

---

### Component 4: Coaching Delivery Engine

**Purpose:** Deliver same-day coaching based on call scores

**How it works:**
1. Call scored (e.g., Pain Funnel score = 45/100)
2. Issues detected (e.g., "Stayed at surface pain, didn't go deep")
3. Coaching prompt pulled from library:

```
⬇️ Go DEEPER on pain - use the Pain Funnel

PROBLEM: You stopped at surface pain. They said "reps aren't
using the methodology" and you moved on. That's level 1 of 7.

IMPACT: Surface pain doesn't create urgency. They'll say
"Let me think about it" because you didn't connect it to
real cost or personal consequences.

FIX: Use the Pain Funnel to go 6-7 levels deep.

SAY THIS:
✅ "Tell me more about that"
✅ "How long has that been happening?"
✅ "What's that costing you?"
✅ "How does that affect YOU personally?"
✅ "What happens if nothing changes?"

NOT THAT:
❌ [Hears surface pain] → "Oh we can help with that!"

PRACTICE: On your next call, ask 7 pain questions in a row.
See how deep you can go before they say "I need to fix this NOW."

📹 Video: Sandler Pain Funnel Mastery, 15:30
```

4. Coaching delivered via email, Slack, or dashboard
5. Rep acknowledges and commits to practice assignment
6. Next call scored → Track if they improved

**Coaching Priority:**
- **🚨 High Priority** - Critical mistakes (spilling candy, skipping compartments)
- **⚠️ Medium Priority** - Technique improvements (reversing, Pain Funnel depth)
- **✨ Opportunity** - Advanced techniques (Pendulum, "What then?")

**User:** Sales reps (receiving coaching) + Managers (reviewing coaching)

**File:** `occ-coaching-prompt-library.json`

**Delivery:** Slack DM, email digest, or dashboard notification

---

## User Flows

### Flow 1: Rep's First Week with OCC

**Day 1: Onboarding**
1. Sales leader shares OCC training materials
2. Rep reads "Quick Start: The Sandler Submarine"
3. Rep watches training videos
4. Rep completes self-assessment (scores 35/70 - "Needs work")

**Day 2: First Call with Copilot**
1. Rep has discovery call scheduled
2. Opens Slack, messages @occ-copilot: "Give me an up-front contract"
3. Copilot responds with template
4. Rep uses it on call
5. During call, prospect asks price → Rep messages Copilot: "They asked price early"
6. Copilot gives reversing script
7. Rep uses it, successfully reverses back to pain

**Day 2: Same Day (After Call)**
1. OCC scores the call: **68/100** (passing!)
2. Coaching delivered via Slack:
   - ✅ Great job setting up-front contract
   - ✅ Nice reversing on the pricing question
   - ⚠️ Pain Funnel only went 3 levels deep - go to 6-7 next time
3. Rep acknowledges, commits to going deeper on next call

**Day 3-5: Reinforcement**
1. Rep does 3 more calls
2. Uses Copilot for real-time help
3. OCC scores all 3 calls
4. Coaching focuses on deepening Pain Funnel
5. By call 3: Pain Funnel score improves from 45 → 72

**Day 5: Manager 1:1**
1. Manager reviews rep's OCC dashboard
2. Sees improvement trend: 68 → 71 → 75 → 78
3. Focuses 1:1 on remaining gap (Decision compartment = 55)
4. Role plays "Besides you, who else is involved?"

**Week 2+: Sustained Improvement**
1. Rep continues using Copilot
2. OCC continues scoring every call
3. Methodology adherence: 78 → 82 → 85
4. Manager tracks close rate improvement

---

### Flow 2: Manager's Monthly Review

**Goal:** Prove methodology training is working (or identify who's drifting)

**Steps:**

1. **Log into OCC Dashboard**
   - Team average methodology adherence: 78/100 (up from 62 last month)
   - 9 out of 10 reps improving
   - 1 rep declining (Sarah: 72 → 58)

2. **Review Top Gaps**
   - Pain Funnel: Team average 71/100 (improving)
   - Decision: Team average 62/100 (needs work)
   - Post-Sell: Team average 48/100 (major gap!)

3. **Drill Down on Sarah (Declining Rep)**
   - Calls scored: 12
   - Pattern: Skipping up-front contract on 10 out of 12 calls
   - Pattern: Pitching in first 3 minutes (spilling candy)
   - Action: Schedule coaching session, focus on up-front contract

4. **Drill Down on Post-Sell Gap (Team Issue)**
   - 80% of team skips post-sell compartment
   - Action: Team training on post-sell next week

5. **Prove ROI to Leadership**
   - Export report:
     - Methodology adherence: 62 → 78 (+26%)
     - Close rate: 18% → 24% (+33%)
     - Revenue impact: +$127k this quarter
   - OCC cost: $500/month = $1,500 total
   - ROI: 8,400%

---

### Flow 3: Rep Uses Copilot During Call (Real-Time)

**Scenario:** Rep is 5 minutes into discovery call. Prospect just shared surface-level pain.

**Prospect:** "Yeah, our reps aren't really using the methodology we trained them on."

**Rep:** [Types in Slack] `@occ-copilot How do I go deeper on this pain?`

**Copilot:**
```
Here's your Pain Funnel sequence:

1. "Can you tell me more about that?"
   [Let them expand]

2. "How long has that been going on?"
   [Establish duration]

3. "What does that mean in terms of lost deals or revenue?"
   [Quantify impact]

4. "How does that affect YOU personally?"
   [Get to personal consequences]

5. "What happens if nothing changes over the next 6 months?"
   [Test urgency]

Ask these in order. Pause 3-5 seconds after each.
Don't pitch. Stay in pain.

Paste their next response and I'll suggest follow-ups.
```

**Rep:** [Uses questions, prospect opens up]

**Prospect:** "Honestly, it's been about 90 days. We're losing maybe 3-4 deals a quarter because they're not qualifying properly. My VP is asking why we spent $150k on training if nothing's changed. I'm on the hook."

**Rep:** [Types] `@occ-copilot They just said they're losing 3-4 deals a quarter and they're on the hook with their VP. What's next?`

**Copilot:**
```
GREAT PAIN (8/10)! You're at level 4-5. Now go to level 6-7:

Advanced Pendulum move: PULL BACK before pushing forward.

Try this (negative reverse):
"Honestly, if it's only 3-4 deals a quarter, maybe this isn't
worth changing. That seems pretty manageable."

Why this works: When you pull back, their brain says
"Wait, I DO have a problem!" and they lean in.

Watch them INSIST it's urgent. Then you have real commitment.
```

**Rep:** [Uses negative reverse]

**Rep:** "Honestly, if it's only 3-4 deals a quarter and you're managing okay, maybe this isn't urgent. Sounds like something you could revisit next quarter."

**Prospect:** "No no, it IS urgent. We have a board meeting in 60 days. If I don't show improvement, they're cutting my budget. I need to fix this now."

**Rep:** [Types] `@occ-copilot Perfect! They said it's urgent, board meeting in 60 days. What now?`

**Copilot:**
```
🎯 You got commitment! Now seal the next compartments:

BUDGET:
"Can we talk about budget so we know if this makes sense?"

DECISION:
"Besides you, who else has to sign off on this?"
"Walk me through how decisions like this usually get made."

FULFILLMENT (only after budget + decision):
"Based on what you've shared - your reps are drifting 90 days
after training, costing 3-4 deals a quarter, and you have a
board meeting in 60 days - here's how we solve that..."

Don't spill your candy until budget + decision are sealed!
```

**Rep:** [Continues call, follows Copilot guidance, closes for demo]

**After call:** OCC scores it 87/100 → Delivers coaching: "Great job using Pendulum technique! One area to improve: you could have used 'What then?' questions to flush decision roadblocks."

---

## Technical Architecture

### System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  INTEGRATIONS                                               │
├─────────────────────────────────────────────────────────────┤
│  • Gong API (call recordings + transcripts)                │
│  • Chorus/Zoom/custom (alternative sources)                │
│  • Slack API (Copilot delivery)                            │
│  • Email API (coaching delivery)                           │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  OCC BACKEND (Vercel Functions / Next.js API Routes)       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. SALES COPILOT API                                       │
│     • Input: Rep question via Slack/web                    │
│     • Process: Match question to intent (9 categories)     │
│     • Output: Response template + Sandler guidance         │
│     • Model: Claude Sonnet 4.5 + intent library            │
│                                                             │
│  2. CALL SCORING API                                        │
│     • Input: Call transcript (from Gong/Zoom)              │
│     • Process: Analyze against scoring schema              │
│     • Output: Score per compartment (0-100)                │
│     • Model: Claude Opus 4.5 (for accuracy)                │
│                                                             │
│  3. COACHING GENERATION API                                 │
│     • Input: Call score + detected issues                  │
│     • Process: Pull coaching prompts from library          │
│     • Output: Prioritized coaching (high/med/low)          │
│     • Model: Template-based (no AI needed)                 │
│                                                             │
│  4. DASHBOARD API                                           │
│     • Input: Manager/rep requests                          │
│     • Process: Aggregate scores, trends, team stats        │
│     • Output: JSON for frontend                            │
│     • Database: Vercel Postgres or Neon                    │
│                                                             │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js App Router)                              │
├─────────────────────────────────────────────────────────────┤
│  • Rep Dashboard (my calls, my coaching, my score)         │
│  • Manager Dashboard (team scores, trends, ROI proof)      │
│  • Training Portal (materials, videos, self-assessment)    │
│  • Copilot Web Interface (if not using Slack)              │
└─────────────────────────────────────────────────────────────┘
```

### Data Model

**Users**
```typescript
type User = {
  id: string;
  name: string;
  email: string;
  role: 'rep' | 'manager' | 'admin';
  team_id: string;
  onboarded_at: Date;
  methodology: 'sandler' | 'meddpicc' | 'challenger' | 'spin' | 'gap';
}
```

**Calls**
```typescript
type Call = {
  id: string;
  rep_id: string;
  prospect_name: string;
  call_date: Date;
  duration_seconds: number;
  recording_url: string;
  transcript: string;

  // Scores
  overall_score: number; // 0-100
  compartment_scores: {
    bonding_rapport: number;
    upfront_contract: number;
    pain: number;
    budget: number;
    decision: number;
    fulfillment: number;
    post_sell: number;
  };

  // Analysis
  anti_patterns: string[]; // e.g., ["spilled_candy", "skipped_upfront_contract"]
  social_layer_bonuses: string[]; // e.g., ["used_pendulum", "what_then_questions"]
  pain_funnel_depth: number; // 1-7

  // Coaching
  coaching_delivered: CoachingPrompt[];
  coaching_acknowledged: boolean;

  // Outcome
  outcome: 'closed_won' | 'closed_lost' | 'in_progress' | 'disqualified';
  close_value: number | null;
}
```

**CoachingPrompts**
```typescript
type CoachingPrompt = {
  id: string;
  call_id: string;
  priority: 'high' | 'medium' | 'opportunity';
  issue: string; // e.g., "stayed_at_surface_pain"
  headline: string;
  problem: string;
  impact: string;
  fix: string;
  say_this: string[];
  not_that: string[];
  practice_assignment: string;
  video_reference: string;
  delivered_at: Date;
  acknowledged_at: Date | null;
}
```

**CopilotInteractions**
```typescript
type CopilotInteraction = {
  id: string;
  rep_id: string;
  call_id: string | null; // null if not during a call
  timestamp: Date;
  user_question: string;
  matched_intent: string; // e.g., "explore_pain"
  bot_response: string;
  helpful: boolean | null; // thumbs up/down feedback
}
```

---

## Implementation Roadmap

### Phase 1: MVP (Weeks 1-4)

**Goal:** Prove the core value - score calls and deliver coaching

**Build:**
1. ✅ **Scoring Schema** (done)
2. ✅ **Coaching Library** (done)
3. ✅ **Training Materials** (done)
4. **Call Scoring API**
   - Input: Paste transcript manually
   - Output: Score + coaching
   - MVP: Web form, no integrations yet
5. **Simple Dashboard**
   - Rep view: My last 5 calls + scores
   - Manager view: Team average score

**Launch:**
- Beta test with 1-2 customers (5-10 reps each)
- Manual transcript upload
- Email coaching delivery
- Prove: "Reps improve 15-20 points in 2 weeks"

---

### Phase 2: Integrations (Weeks 5-8)

**Goal:** Automate call ingestion

**Build:**
1. **Gong Integration**
   - Auto-pull call recordings + transcripts
   - Score every call automatically
2. **Slack Integration**
   - Deliver coaching via Slack DM
   - Rep can acknowledge/dismiss
3. **Manager Dashboard v2**
   - Team trends over time
   - Drill-down by compartment
   - Export reports (PDF)

**Launch:**
- Scale to 5-10 customers (50-100 reps)
- Automated scoring + coaching
- Weekly email digest for managers

---

### Phase 3: Sales Copilot (Weeks 9-12)

**Goal:** Add real-time guidance during calls

**Build:**
1. ✅ **Copilot Intent Library** (you already have the JSON!)
2. **Slack Bot (@occ-copilot)**
   - Rep messages during call
   - Bot matches question to intent
   - Responds with Sandler guidance
3. **Copilot API**
   - Input: User question
   - Process: Claude + intent matching
   - Output: Response template

**Launch:**
- Beta with existing customers
- Track: "Do reps who use Copilot score higher?"
- Collect feedback on intents (add more categories)

---

### Phase 4: Advanced Features (Weeks 13-16)

**Goal:** Prove ROI, build competitive moats

**Build:**
1. **ROI Dashboard**
   - Methodology adherence vs close rate correlation
   - Revenue impact calculator
   - Export for leadership presentations
2. **Multi-Methodology Support**
   - Not just Sandler - add MEDDIC, Challenger, SPIN
   - Customer selects their methodology
   - Schema + coaching library adapt
3. **Advanced Analytics**
   - Which compartments correlate most with closed deals?
   - Which reps are improving fastest?
   - Predictive: "This rep is drifting, likely to miss quota"

**Launch:**
- Full production release
- Target: 20+ customers, 200+ reps
- Pricing: $50/rep/month

---

### Phase 5: Scale (Months 5-6)

**Goal:** 100+ customers, 1000+ reps

**Build:**
1. **Mobile App** (iOS/Android)
   - Copilot in pocket during calls
   - Push notifications for coaching
2. **Chrome Extension**
   - Sidebar during Zoom/Google Meet
   - Real-time Sandler tips
3. **White-Label Option**
   - Sandler franchises can rebrand OCC
   - Custom domain, custom logo
4. **API for Partners**
   - Gong/Chorus can embed OCC scores
   - CRM integrations (Salesforce, HubSpot)

---

## Pricing & Packaging

### Pricing Model

**$50 per rep per month** (flat fee)

**Why this works:**
- Simple, transparent
- Aligns with value (prevent drift = save deals)
- Competitor pricing: Gong ($1,200+/user/year), Chorus ($900+/user/year)
- OCC is 50% cheaper and focused on methodology, not just call intelligence

### Packaging

**Single Tier: OCC Complete**

Includes:
- ✅ Unlimited call scoring
- ✅ Same-day coaching delivery
- ✅ Sales Copilot (real-time guidance)
- ✅ Training materials (Sandler or custom methodology)
- ✅ Manager dashboard + ROI reports
- ✅ Slack + email integration
- ✅ Gong/Chorus/Zoom integration

**No tiers, no upsells.** Just $50/rep/month.

**Minimum:** 5 reps ($250/month)
**Target customer:** 10-50 reps ($500-$2,500/month)

### Sales Motion

**Ideal fit:**
- Sales leaders with 5-50 reps
- Already invested in methodology training (Sandler, MEDDIC, etc.)
- Using Gong, Chorus, or similar call recording tool
- Frustrated that training didn't stick

**Buyer persona:**
- VP Sales, Head of Sales Enablement, RevOps Leader
- Pain: "We spent $150k on Sandler training and reps reverted in 90 days"
- Goal: Prove ROI on training investment

**Sales process:**
1. **Inbound lead** (from website chatbot - Maya)
2. **Discovery call** (using Sandler, of course!)
3. **Demo** (show scoring + coaching from their own calls)
4. **Pilot** (2 weeks, 5-10 reps, prove 15-20 point improvement)
5. **Close** (roll out to full team)

**Pricing conversation:**
> "You mentioned you're losing 3-4 deals per quarter per rep because they're not using the methodology. That's roughly $X in lost revenue. OCC is $50/rep/month. If we help you close even 1 extra deal per quarter, what's the ROI?"

**Typical ROI:**
- 10 reps × $50/month = $500/month
- If OCC helps close 2 extra deals/quarter (across 10 reps) = ~$20k+ in revenue
- ROI: 4,000%+

---

## Go-to-Market Strategy

### Phase 1: Sandler Franchises (Weeks 1-8)

**Why:** They already have customers who need this. They're motivated to prove training works.

**Approach:**
1. Reach out to 50 Sandler franchises
2. Offer: "We'll help your clients prove Sandler training ROI"
3. White-label option: Rebrand as "[Franchise Name] Coaching Platform"
4. Revenue share: 20% to franchise, 80% to OCC

**Target:** 5 franchise partnerships, 20 customers, 200 reps

---

### Phase 2: Direct Sales (Months 3-6)

**Why:** Expand beyond Sandler to MEDDIC, Challenger, SPIN, Gap Selling

**Approach:**
1. Content marketing (LinkedIn posts, case studies)
2. SEO ("Sandler training ROI", "prevent sales methodology drift")
3. Paid ads (LinkedIn, Google)
4. Webinars ("How to Prove Your Sales Training is Working")

**Target:** 50 customers, 500 reps

---

### Phase 3: Partner with Gong/Chorus (Months 6-12)

**Why:** They have the call data, we have the methodology expertise

**Approach:**
1. Build native integration (OCC scores show up in Gong)
2. Joint marketing ("Gong shows you WHAT happened, OCC shows you HOW to fix it")
3. Referral partnership (Gong recommends OCC to customers who ask about methodology)

**Target:** 200 customers, 2000 reps

---

## Success Metrics

### Product Metrics

- **Call Score Improvement:** Reps improve 15-20 points in first 2 weeks
- **Coaching Engagement:** 80%+ of reps acknowledge coaching within 24 hours
- **Copilot Usage:** 3-5 questions per call average
- **Methodology Adherence:** Team average 70+ by week 4

### Business Metrics

- **MRR:** $10k (Month 1) → $100k (Month 12)
- **Customer Count:** 5 (Month 1) → 100 (Month 12)
- **Rep Count:** 50 (Month 1) → 2,000 (Month 12)
- **Churn:** <5% monthly
- **NPS:** 50+ (promoters love it because it proves ROI)

### ROI Proof

- **Customer testimonial:** "Our close rate improved 8 percentage points in 90 days. OCC helped us prove our Sandler training was worth it."
- **Data:** Reps scoring 80+ close at 2x the rate of reps scoring 60-

---

## Next Steps

### Immediate (This Week)

1. ✅ Finalize the 4 core files:
   - `occ-call-scoring-schema.json`
   - `occ-coaching-prompt-library.json`
   - `occ-training-materials.md`
   - `sales-copilot-intents.json`

2. **Build MVP Call Scoring API**
   - Create `/api/score-call` endpoint
   - Input: Paste transcript
   - Output: Score + coaching (JSON)

3. **Test with real call transcript**
   - Use one of your own sales calls
   - Score it
   - See if coaching makes sense

### Short-Term (Next 2 Weeks)

1. **Build simple dashboard**
   - Rep can paste transcript → see score
   - Manager can see team average

2. **Beta test with 1-2 customers**
   - Manually score their calls
   - Deliver coaching via email
   - Collect feedback

3. **Refine scoring schema**
   - Are the weights right?
   - Are we detecting anti-patterns accurately?

### Medium-Term (Next 4-8 Weeks)

1. **Build Gong integration**
2. **Build Slack Copilot bot**
3. **Launch with 5-10 customers**
4. **Prove: Reps improve 15-20 points in 2 weeks**

---

## Questions / Decisions Needed

1. **Which integration first: Gong or Chorus or Zoom?**
   - Recommendation: Gong (most popular with your ICP)

2. **Copilot delivery: Slack bot or Chrome extension or web app?**
   - Recommendation: Slack bot (easiest to build, fastest adoption)

3. **Methodology: Sandler-only or multi-methodology from day 1?**
   - Recommendation: Sandler-only for MVP, add others in Phase 4

4. **Pricing: $50/rep or different?**
   - Recommendation: $50/rep is right (simple, defensible, great margins)

---

**Ready to build the MVP?** 🚀
